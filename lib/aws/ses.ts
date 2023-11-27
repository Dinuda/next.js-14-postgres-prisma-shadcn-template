import AWS from 'aws-sdk';
import { env } from 'process';

AWS.config.update({
  region: env.AWS_REGION,
});

export function sendSESEmail(message: string, email: string, subject: string) {
  const ses = new AWS.SES();
  const params = {
    Destination: {
      ToAddresses: [email],
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
        Data: subject,
      },
    },
    Source: env.AWS_VERIFIED_SENDER_ADDRESS
  } as AWS.SES.SendEmailRequest;

  // catch failure
  const sendPromise = ses.sendEmail(params).promise();
  sendPromise.then().catch(() => {
    console.log("sent email successfully");
  });
}