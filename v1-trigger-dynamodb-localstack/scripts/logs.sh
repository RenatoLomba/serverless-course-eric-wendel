# See logs of the lambda
sls logs -f hero-trigger --stage local

# Deploy trigger local
sls deploy -f hero-trigger --stage local
