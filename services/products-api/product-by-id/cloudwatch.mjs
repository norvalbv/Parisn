import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';

export const CloudWatch = async (event) => {
  const cloudwatchlogs = new CloudWatchLogs();

  const putLogParams = {
    logEvents: [
      {
        message: JSON.stringify(event),
        timestamp: new Date().getTime(),
      },
    ],
    logGroupName: 'parisn',
    logStreamName: 'products-api',
  };

  await cloudwatchlogs.putLogEvents(putLogParams);
};
