[![Build Status](https://travis-ci.org/otaigbe/Epic-Mail.svg?branch=ft-integrating-travisci-164355491)](https://travis-ci.org/otaigbe/Epic-Mail) [![Coverage Status](https://coveralls.io/repos/github/otaigbe/Epic-Mail/badge.svg?branch=ch-integrating-test-coverage-with-coveralls-164356614)](https://coveralls.io/github/otaigbe/Epic-Mail?branch=ch-integrating-test-coverage-with-coveralls-164356614) [![Maintainability](https://api.codeclimate.com/v1/badges/c305b3de69127b0b12f0/maintainability)](https://codeclimate.com/github/otaigbe/Epic-Mail/maintainability)
# Epic-Mail
Epic mail is an email service used for sending messages between users. It is a light weight, easy to use desktop application that runs primarily in a browser. It is built on top of NodeJS and uses javascript to query restful resources from the backend. It is higly responsive and flexible because it provides users with opportunity to:
 - create and send messages
 - receive messages
 - view received messages
 - delete messages
 - retract a sent message
 - save messages as draft to send later
 - reply to messages
 - view sent messages.
# Getting Started
To obtain a copy of this app download or clone the repository at this [url](https://github.com/otaigbe/Epic-Mail.git)

# Prerequisites
You must have
- NodeJs Installed
- A browser Installed
- A RESTAPI client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing
- (If the repository wasnt cloned)Extract the contents of the downloaded zip file into any suitable location on the computer 
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm start' to start the application
- In a browser address bar navigate to 'http://localhost:3000/signin.html'

# Using Epic-mail through its Gui
- Input http://localhost:3000/signup.html in the address bar.
- Enter appropriate information
- Click the sign up button
- A redirect to the inbox page would occur upon successful signup. The inbox page provides buttons for all operations to be performed so from here on just click on the appropriate buttons.

# Using Epic-mail through a restful client
- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST, DELETE, PUT
- Enter the appropriate information(refer to the API [Docs](https://app.swaggerhub.com/apis-docs/otaigbe/Epic-mail/1.0.0) in json format and click send 
-For:
### Signin
- Use the POST method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/auth/signin 
### Signup
- Use the POST method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/auth/signup 
### Get all received messages
- Use the GET method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages 
### Get all unread messages
- Use the GET method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages/unread 
### Get all sent messages
- Use the GET method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages/sent 
### Get single message
- Use the GET method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages/messageId
### Delete single message
- Use the DELETE method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages/messageId 
### Create Message
- Use the POST method
- Use this url https://epic-mail-app.herokuapp.com/api/v1/messages
After Each operation a json object is returned either after success or failure.

# Running Tests
If all the dependencies installed correctly run 'npm test' in the root of the installation folder in the command prompt/Terminal. Each test tests each aforementioned operation individually.

## Built With
- NodeJs
- Express
## Tested With
- Mocha
- Chai

## Author
- Otaigbe Okhueleigbe