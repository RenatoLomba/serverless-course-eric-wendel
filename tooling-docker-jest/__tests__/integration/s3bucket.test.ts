import { APIGatewayEvent } from 'aws-lambda'
import type { CreateBucketRequest } from 'aws-sdk/clients/s3'

import { main } from '../../src'
import { s3 } from '../../src/factory'

describe('Testing AWS S3 Bucket Offline with LocalStack', () => {
  const bucketConfig: CreateBucketRequest = {
    Bucket: 'test-bucket',
  }

  beforeAll(async () => {
    await s3.createBucket(bucketConfig).promise()
  })

  afterAll(async () => {
    await s3.deleteBucket(bucketConfig).promise()
  })

  it('should return a S3 Bucket list', async () => {
    const expected = bucketConfig.Bucket

    const response = await main({} as APIGatewayEvent)

    const body = response.body
    const { allBuckets } = JSON.parse(body)
    const { Buckets } = allBuckets

    expect(Buckets[0].Name).toStrictEqual(expected)
    expect(response.statusCode).toStrictEqual(200)
  })
})
