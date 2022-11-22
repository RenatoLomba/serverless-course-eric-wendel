import * as aws from 'aws-sdk'

import { HeroesInsert } from './handlers/heroesInsert'

const isLocal = !!process.env.IS_OFFLINE

const dynamoDbConfig: aws.DynamoDB.ClientConfiguration = {
  region: process.env.AWS_REGION!,
}

if (isLocal) {
  const host = process.env.LOCALSTACK_HOST

  dynamoDbConfig.endpoint = new aws.Endpoint(`http://${host}:4566`)
}

export const dynamoDB = new aws.DynamoDB(dynamoDbConfig)

export const heroesInsert = new HeroesInsert(dynamoDB)
