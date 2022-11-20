import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'

import { s3 } from './factory'

export const main = async (
  _: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  const allBuckets = await s3.listBuckets().promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World from Docker!',
        allBuckets,
      },
      null,
      2,
    ),
  }
}
