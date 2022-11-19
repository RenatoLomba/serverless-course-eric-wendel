import type { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as aws from 'aws-sdk'

const isLocal = !!process.env.IS_OFFLINE

const s3Config: aws.S3.ClientConfiguration = {
  s3ForcePathStyle: true,
}

if (isLocal) {
  aws.config.update({
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    },
  })

  const host = 'localhost'
  s3Config.endpoint = new aws.Endpoint(`http://${host}:4566`)
}

const s3 = new aws.S3(s3Config)

export const hello = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  const allBuckets = await s3.listBuckets().promise()

  console.log('BUCKETS', allBuckets)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        allBuckets,
      },
      null,
      2,
    ),
  }
}
