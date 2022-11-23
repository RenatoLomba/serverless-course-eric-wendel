import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import type { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'

import { validate } from '../common/decorators/validate'
import { RequestException } from '../common/errors/request-exception'
import { createHeroSchema } from '../validators/create-hero.validator'
import type { CreateHeroData } from '../validators/create-hero.validator'

const dynamoDBTable = process.env.DYNAMODB_TABLE

export class HeroesInsert {
  constructor(private dynamoDb: DynamoDB) {}

  @validate(createHeroSchema)
  async main(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const createHeroData = event.parsedData! as CreateHeroData

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

      throw new RequestException(500, [
        {
          message: "Couldn't create item",
        },
      ])
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
