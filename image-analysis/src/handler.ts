import { Rekognition, Translate } from "aws-sdk"
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

export class Handler {
  constructor(
    private rekognitionService: Rekognition,
    private translateService: Translate
  ) { }

  async main(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    console.log('EVENT', event)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello Image Analysis!'
      }, null, 2)
    }
  }
}
