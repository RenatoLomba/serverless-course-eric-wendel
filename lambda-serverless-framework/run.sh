# Install Serverless Framework
npm i -g serverless

# Init Serverless
sls

# Deploy Sls
sls deploy

# Get info
sls info

# Local invocation
sls invoke local -f hello

# Prod invocation
sls invoke --log -f hello

# Enable monitoring console
sls --console

# Remove application
sls remove