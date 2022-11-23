import type { APIGatewayEvent } from 'aws-lambda'
import type { ZodObject } from 'zod'

import { RequestException } from '../errors/request-exception'

export const validate = (schema: ZodObject<{}>) => {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args) {
      const event = args[0] as APIGatewayEvent

      if (!event.body) {
        throw new RequestException(400, [
          {
            message: 'Body is required',
          },
        ])
      }

      const data = JSON.parse(event.body)

      const validationResult = schema.safeParse(data)

      if (!validationResult.success) {
        throw new RequestException(400, validationResult.error.issues)
      }

      args[0].parsedData = validationResult.data

      return originalMethod.apply(this, args)
    }
  }
}
