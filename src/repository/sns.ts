import { SNS } from "aws-sdk";
import { config } from "../config";

const REGION = config.region;
// Create SNS service object.
const snsClient = new SNS({ region: REGION });

export const sendMessage = async (message: string) => {
  var params = {
    Message: message,
    TopicArn: config.topicArn,
  };
  return snsClient.publish(params).promise();
};
