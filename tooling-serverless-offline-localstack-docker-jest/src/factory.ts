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

  const host = process.env.LOCALSTACK_HOST
  s3Config.endpoint = new aws.Endpoint(`http://${host}:4566`)
}

export const s3 = new aws.S3(s3Config)
