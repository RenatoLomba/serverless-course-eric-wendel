import { ScheduledEvent } from 'aws-lambda';

export const handler = async (event: ScheduledEvent) => {
  console.log('ENVIRONMENT VARIABLES', JSON.stringify(process.env, null, 2));
  console.log('SCHEDULED EVENT', JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
  };
};
