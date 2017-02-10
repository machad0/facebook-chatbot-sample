'use strict';

require('dotenv').config();

const express = require('express'),
      request = require('request'),
      FBBotFramework = require('fb-bot-framework'),
      bunyan = require('bunyan'),
      logger = bunyan.createLogger({
        name: 'facebot'
      });

logger.info("wooow");


const app = express();
app.listen('8001');

const bot = new FBBotFramework({
    page_token: process.env.FACEBOOK_CHAT_SECRET,
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN
});

app.use('/webhook', bot.middleware());


bot.on('message', function(userId, message){
    bot.sendTextMessage(userId, "HELLO:" + message);
});


bot.setGetStartedButton("PRESS_ME");

bot.on('postback', function(userId, payload){

    if (payload === "PRESS_ME") {
        getStarted(userId);
        logger.info("pressed");
    }

});
