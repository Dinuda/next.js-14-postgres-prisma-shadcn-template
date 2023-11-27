import AWS from 'aws-sdk';
import { env } from 'process';

AWS.config.update({
  region: env.AWS_REGION,
});

export function sendSNSNotification(message: string, phoneNumber: string) {
  const sns = new AWS.SNS();
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
  };  
  return sns.publish(params).promise();
}
