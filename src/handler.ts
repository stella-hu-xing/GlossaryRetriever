import { Context } from "aws-lambda";

exports.handler = async function (event: any, context: Context) {
  console.log("Function name: ", context.functionName);
  console.log({ event, eventtime: Date.now().toLocaleString() });
  return context.functionName;
};
