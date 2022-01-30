import { Context } from "aws-lambda";
import { sendMessage } from "./repository/sns";

export async function handler(event: any, context: Context) {
  console.log("Function name: ", context.functionName);
  await sendMessage("First message!");
  console.log("Email sent!");
  return context.functionName;
}
