import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { RequestException } from './request-exception'

export function errorHandler(
  fn: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>,
) {
  return async function (
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> {
    try {
      const result = await fn(event)
      return result
    } catch (err) {
      if (err instanceof RequestException) {
        return {
          statusCode: err.statusCode,
          body: JSON.stringify({
            errors: err.errors,
          }),
        }
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          errors: [
            {
              message: 'Internal Server Error',
            },
          ],
        }),
      }
    }
  }
}
