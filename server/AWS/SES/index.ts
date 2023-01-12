import { SendEmailCommand } from '@aws-sdk/client-ses';

export const createSendEmailCommand = (fromAddress: string, message: string) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [process.env.EMAIL],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Customer Support Query',
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};
