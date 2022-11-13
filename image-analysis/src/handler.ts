import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Rekognition, Translate } from 'aws-sdk'
import axios from 'axios'

export class Handler {
  constructor(
    private rekognitionService: Rekognition,
    private translateService: Translate,
  ) {}

  private async getImageBuffer(imageUrl: string) {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    })

    const buffer = Buffer.from(response.data, 'base64')

    return buffer
  }

  private async detectImageLabels(imageBuffer: Buffer) {
    const result = await this.rekognitionService
      .detectLabels({
        Image: {
          Bytes: imageBuffer,
        },
      })
      .promise()

    const workingItems = result.Labels!.filter(
      ({ Confidence }) => Confidence! > 80,
    )

    const names = workingItems.map(({ Name }) => Name).join(' and ')

    return {
      names,
      workingItems,
    }
  }

  private async translateText(Text: string) {
    const { TranslatedText } = await this.translateService
      .translateText({
        SourceLanguageCode: 'en',
        TargetLanguageCode: 'pt',
        Text,
      })
      .promise()

    return TranslatedText.split(' e ')
  }

  private formatTextResults(
    texts: string[],
    workingItems: Rekognition.Label[],
  ) {
    const finalText: string[] = []

    for (const text in texts) {
      const nameInPt = texts[text]
      const confidence = workingItems[text]

      finalText.push(
        `${confidence.Confidence?.toFixed(2)}% de ser do tipo ${nameInPt}`,
      )
    }

    return finalText.join('\n')
  }

  async main(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      const imageUrl = event.queryStringParameters?.imageUrl

      if (!imageUrl) {
        return {
          statusCode: 400,
          body: 'Query param "imageUrl" is required',
        }
      }

      console.log('HANDLER.MAIN INFO: ', 'DOWNLOADING IMAGE...')

      const imageBuffer = await this.getImageBuffer(imageUrl)

      console.log('HANDLER.MAIN INFO: ', 'DETECTING LABELS...')

      const { names, workingItems } = await this.detectImageLabels(imageBuffer)

      console.log('HANDLER.MAIN INFO: ', 'TRANSLATING...')

      const translatedText = await this.translateText(names)

      const formattedTexts = this.formatTextResults(
        translatedText,
        workingItems,
      )

      return {
        statusCode: 200,
        body: `A imagem tem\n`.concat(formattedTexts),
      }
    } catch (ex) {
      console.error('HANDLER.MAIN ERROR: ', (ex as Error).stack)

      return {
        statusCode: 500,
        body: 'Internal Server Error',
      }
    }
  }
}
