import { APIGatewayEvent } from 'aws-lambda'

export default {
  queryStringParameters: {
    imageUrl: 'https://www.doglife.com.br/site/assets/images/cao.png',
  },
} as unknown as APIGatewayEvent
