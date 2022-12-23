# Local invoke scheduled event
sls invoke local -f commit-message-scheduler --stage local

# Log shceduled event
sls logs -f commit-message-scheduler --stage local
