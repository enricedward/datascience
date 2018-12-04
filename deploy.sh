aws s3 sync ./dist s3://datascience.oceanprotocol.com \
    --delete \
    --acl public-read \
    --exclude '.DS_Store' \
    --cache-control max-age=0,no-cache,no-store,must-revalidate
