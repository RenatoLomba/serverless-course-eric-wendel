BUCKET_NAME=treinamento-aws-renato-2022

# Create bucket on localstack
aws \
  s3 mb s3://$BUCKET_NAME \
  --endpoint-url=http://localhost:4566

aws \
  s3 ls s3://$BUCKET_NAME \
  --endpoint-url=http://localhost:4566
