import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';

export const CloudWatch = async (event) => {
  const cloudwatchlogs = new CloudWatchLogs();

  // describeLogStreams to get sequenceToken
  const describeParams = {
    limit: 1,
    logGroupName: 'testt',
    logStreamNamePrefix: 'teststream',
  };

  const res = await cloudwatchlogs.describeLogStreams(describeParams);
  const logStreams = res.logStreams;
  const sequenceToken = logStreams[0].uploadSequenceToken;

  // putLogEvents
  const logMsg = event.pathParameters;
  const putLogParams = {
    logEvents: [
      {
        message: JSON.stringify(logMsg),
        timestamp: new Date().getTime(),
      },
    ],
    logGroupName: 'testt',
    logStreamName: 'teststream',
    sequenceToken,
  };

  await cloudwatchlogs.putLogEvents(putLogParams);
};
