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
    logStreamName: 'newsletter',
  };

  await cloudwatchlogs.putLogEvents(putLogParams);
};
