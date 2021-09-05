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
