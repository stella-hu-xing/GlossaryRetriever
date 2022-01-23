import { Context } from "aws-lambda";

export async function handler(event: any, context: Context) {
  console.log("Function name: ", context.functionName);
  console.log({ event, eventtime: Date.now().toLocaleString() });
  return context.functionName;
}
