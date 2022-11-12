import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Rekognition, Translate } from 'aws-sdk'

export class Handler {
  constructor(
    private rekognitionService: Rekognition,
    private translateService: Translate,
  ) {}

  async main(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Hello Image Analysis!',
        },
        null,
        2,
      ),
    }
  }
}
