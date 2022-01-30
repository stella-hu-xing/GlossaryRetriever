# GlossaryReminder

A simple youdao dictionary glossary notebook reminder

## Functions

- retrieve full list of glossary from Youdao Dict
- send random 20 words to email to refresh memory
- delete words in response from list (stretch)

### Progress

[project](https://github.com/stella-hu-xing/GlossaryRetriever/projects/1)

### Technology

#### Youdao API

- Login: 'http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dnull'
- Get WordBook List: 'http://dict.youdao.com/wordbook/webapi/words'
- Get WordBook Groups (optional)'http://dict.youdao.com/wordbook/webapi/books'

#### Development

Typescript + Node JS
Serverless Framework
CodePipeline + CodeBuild + CodeDeploy

refs:
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
https://sanderknape.com/2018/02/comparing-aws-sam-with-serverless-framework/

other options: CodeStar, AWS SAM

# Serverless Framework Node Scheduled Cron on AWS

This template demonstrates how to develop and deploy a simple cron-like service running on AWS Lambda using the traditional Serverless Framework.

## Schedule event type

This examples defines two functions, `cron` and `secondCron`, both of which are triggered by an event of `schedule` type, which is used for configuring functions to be executed at specific time or in specific intervals. For detailed information about `schedule` event, please refer to corresponding section of Serverless [docs](https://serverless.com/framework/docs/providers/aws/events/schedule/).

When defining `schedule` events, we need to use `rate` or `cron` expression syntax.

### Rate expressions syntax

```pseudo
rate(value unit)
```

`value` - A positive number

`unit` - The unit of time. ( minute | minutes | hour | hours | day | days )

In below example, we use `rate` syntax to define `schedule` event that will trigger our `rateHandler` function every minute

```yml
functions:
  rateHandler:
    handler: handler.run
    events:
      - schedule: rate(1 minute)
```

Detailed information about rate expressions is available in official [AWS docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#RateExpressions).

### Cron expressions syntax

```pseudo
cron(Minutes Hours Day-of-month Month Day-of-week Year)
```

All fields are required and time zone is UTC only.

| Field        |     Values      |   Wildcards    |
| ------------ | :-------------: | :------------: |
| Minutes      |      0-59       |    , - \* /    |
| Hours        |      0-23       |    , - \* /    |
| Day-of-month |      1-31       | , - \* ? / L W |
| Month        | 1-12 or JAN-DEC |    , - \* /    |
| Day-of-week  | 1-7 or SUN-SAT  | , - \* ? / L # |
| Year         |     192199      |    , - \* /    |

In below example, we use `cron` syntax to define `schedule` event that will trigger our `cronHandler` function every second minute every Monday through Friday

```yml
functions:
  cronHandler:
    handler: handler.run
    events:
      - schedule: cron(0/2 * ? * MON-FRI *)
```

Detailed information about cron expressions in available in official [AWS docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions).

### Local invocation

In order to test out your functions locally, you can invoke them with the following command:

```
serverless invoke local --function rateHandler
```

After invocation, you should see output similar to:

```bash
Your cron function "aws-node-scheduled-cron-dev-rateHandler" ran at Fri Mar 05 2021 15:14:39 GMT+0100 (Central European Standard Time)
```
