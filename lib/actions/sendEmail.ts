'use server';

import AWS from 'aws-sdk';

type SendEmailProps = {
  name: string;
  email: string;
  message: string;
};

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, RECEIVING_EMAIL } = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !RECEIVING_EMAIL) {
  throw new Error('Environment variables are not set.');
}

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const sendEmail = async ({ name, email, message }: SendEmailProps): Promise<{ ok: boolean }> => {
  const ses = new AWS.SES();

  const params = {
    Source: RECEIVING_EMAIL,
    Destination: {
      ToAddresses: [RECEIVING_EMAIL],
    },
    ReplyToAddresses: [email],
    Message: {
      Subject: {
        Data: `New message from ${name}`,
      },
      Body: {
        Text: {
          Data: `From: ${name} (${email})\n\nMessage: ${message}`,
        },
      },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    return { ok: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { ok: false };
  }
};

export default sendEmail;
