import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

const dynamoDBTable = process.env.DYNAMODB_TABLE

const createHeroSchema = z.object({
  name: z.string().min(1),
  power: z.string().nullable().optional(),
})

type CreateHeroData = z.infer<typeof createHeroSchema>

export class HeroesInsert {
  constructor(private dynamoDb: DynamoDB) {}

  async main(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: [
            {
              message: 'Body is required',
            },
          ],
        }),
      }
    }

    const data = JSON.parse(event.body)

    let createHeroData = {} as CreateHeroData

    const validationResult = createHeroSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: validationResult.error.issues,
        }),
      }
    }

    createHeroData = validationResult.data

    const id = uuid().toString()
    const name = createHeroData.name
    const power = createHeroData.power
    const createdAt = new Date().toISOString()

    const params = {
      TableName: dynamoDBTable!,
      Item: {
        id: { S: id },
        name: { S: name },
        createdAt: { S: createdAt },
      },
    } as DynamoDB.PutItemInput

    if (power) {
      params.Item.power = { S: power }
    }

    try {
      await this.dynamoDb
        .putItem({
          ...params,
        })
        .promise()
    } catch (err) {
      console.error('HERO INSERT DYNAMODB ERROR\n', err.stack)

      return {
        statusCode: 500,
        body: JSON.stringify({
          errors: [
            {
              message: "Couldn't create item",
            },
          ],
        }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        hero: {
          id,
          name,
          power,
          createdAt,
        },
      }),
    }
  }
}
