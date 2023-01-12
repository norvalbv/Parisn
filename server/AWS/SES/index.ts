import { SendEmailCommand } from '@aws-sdk/client-ses';

export const createSendEmailCommand = (fromAddress: string, message: string) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [process.env.EMAIL],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: message,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'Hello, Sir!',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Customer Support Query',
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};
