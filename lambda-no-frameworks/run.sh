# Attach Role to lambda

# Environment variables
ROLE_NAME=lambda-example
NODE_JS_VERSION=nodejs16.x
FUNCTION_NAME=hello-cli

# Create logs folder
mkdir -p logs

# Create security policies from file
aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file://policies.json \
  | tee logs/1.role.log

# Get the policy arn from log file
POLICY_ARN=$(cat logs/1.role.log | jq -r .Role.Arn)

# Build the ts file
npm run build

# Zip the js file
cd ./dist; zip -r ../function.zip index.js

# Create lambda
aws lambda create-function \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://function.zip \
  --handler index.handler \
  --runtime $NODE_JS_VERSION \
  --role $POLICY_ARN \
  | tee logs/2.lambda-create.log

sleep 1

# Invoke lambda
aws lambda invoke \
  --function-name $FUNCTION_NAME logs/3.lambda-exec.log \
  --log-type Tail \
  --query 'LogResult' \
  --output text | base64 -d

# Update lambda
aws lambda update-function-code \
  --zip-file fileb://function.zip \
  --function-name $FUNCTION_NAME \
  --publish \
  | tee logs/4.lambda-update.log

# Invoke with payload
aws lambda invoke \
  --function-name $FUNCTION_NAME logs/5.lambda-payload.log \
  --log-type Tail \
  --query 'LogResult' \
  --cli-binary-format raw-in-base64-out \
  --payload '{"name": "renatolomba"}' \
  --output text | base64 -d

# Delete lambda
aws lambda delete-function \
  --function-name $FUNCTION_NAME

# Delete role
aws iam delete-role \
  --role-name $ROLE_NAME
