# Create bucket
aws s3api create-bucket --bucket rntlomba-hello-bucket-07112022

# Upload file to bucket
aws s3 cp hello.txt s3://rntlomba-hello-bucket-07112022/hello.txt

# Download file from bucket
aws s3 cp s3://rntlomba-hello-bucket-07112022/hello.txt hello-from-bucket.txt

# Clear bucket
aws s3 rm s3://rntlomba-hello-bucket-07112022 --recursive

# Delete bucket
aws s3api delete-bucket --bucket rntlomba-hello-bucket-07112022