import 'aws-lambda/common/api-gateway'

declare module 'aws-lambda/common/api-gateway' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface APIGatewayEvent {
    parsedData?: unknown
    body?: string
  }
}
