mkdir logs

aws dynamodb create-table \
  --table-name $DYNAMODB_TABLE \
  --attribute-definitions AttributeName=id,AttributeType=S AttributeName=name,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH  AttributeName=name,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES \
  --region us-east-1 \
  --endpoint-url=http://$LOCALSTACK_HOST:4566 \
  | tee logs/create-dynamodb-table.log

DYNAMODB_TABLE_STREAM=$(cat logs/create-dynamodb-table.log | jq -r .TableDescription.LatestStreamArn)

echo $DYNAMODB_TABLE_STREAM
