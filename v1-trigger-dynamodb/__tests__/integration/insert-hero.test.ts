import { APIGatewayEvent } from 'aws-lambda'

import { heroesInsertHandler } from '../../src'
import { dynamoDB } from '../../src/factory'

const TableName = process.env.DYNAMODB_TABLE!

describe('Hero Insert e2e', () => {
  beforeAll(async () => {
    await dynamoDB
      .createTable({
        TableName,
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'name',
            KeyType: 'RANGE',
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
          {
            AttributeName: 'name',
            AttributeType: 'S',
          },
        ],
      })
      .promise()
  })

  afterAll(async () => {
    await dynamoDB
      .deleteTable({
        TableName,
      })
      .promise()
  })

  it('should return status 400 when trying to create hero without informing the body on the request', async () => {
    const response = await heroesInsertHandler({} as APIGatewayEvent)

    const parsedResponse = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(400)
    expect(parsedResponse.errors[0].message).toStrictEqual('Body is required')
  })

  it('should return status 400 when trying to create hero without informing the required fields on the request body', async () => {
    const response = await heroesInsertHandler({
      body: '{}',
    } as APIGatewayEvent)

    const parsedResponse = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(400)
    expect(parsedResponse.errors[0].message).toStrictEqual('Required')
  })

  it('should return status 200 when successfully created a hero', async () => {
    const name = 'test-hero'
    const response = await heroesInsertHandler({
      body: JSON.stringify({
        name,
      }),
    } as APIGatewayEvent)

    const parsedResponse = JSON.parse(response.body)

    expect(response.statusCode).toStrictEqual(200)
    expect(parsedResponse.hero.id).toBeDefined()
    expect(parsedResponse.hero.name).toStrictEqual(name)
  })
})
