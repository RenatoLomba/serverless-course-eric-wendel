DYNAMODB_TABLE_NAME=Heroes

aws dynamodb create-table \
  --table-name $DYNAMODB_TABLE_NAME \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=name,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH  AttributeName=name,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --region us-east-1 \
  --endpoint-url=http://localhost:4566 | jq
