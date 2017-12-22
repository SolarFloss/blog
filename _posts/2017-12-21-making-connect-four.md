---
layout: post
title:  "Making A P2P Connect Four Game"
categories: jekyll update
permalink: /making-p2p-connect-four/
edited: 2017-12-22 09:31:37 -0400
published: true
author: Nicholas Morris
description: Making a simple p2p connect 4 game
comments: true
---

# Hello!

First, I want to apologize for the late post, and the lack of a post last week. I had finals last week so I was swamped with studying and last minute work. No worries though, because now I am back and better than ever!

Two weeks ago I said that I would be working on an Amazon Alexa Skill to try and get a free Echo Dot, or a free hoodie. I would still like to do that, but two nights ago while playing makeshift connect four on a discord server I had the wild idea to create a p2p web based connect 4 game. At first it was just a stupid idea that I wasn't sure if I actually wanted to do, but as I fell asleep I really started thinking the possibility of making it. When I woke up my mind was overflowing with ideas, but I didn't really know where to start since I've never made anything like this before. I won't be going too in depth about the project, but if you have any questions about what I did feel free to shoot me a message.

After doing a bit of research I came across a pretty simple looking WebRTC based p2p API called [PeerJS](http://peerjs.com). The one issue that I knew I would run into was hosting some kind of server. I've hosted a server once for a [Twitter Game](https://github.com/SolarFloss/Slayer) I made, but I was following a very specific tutorial so I'm not really sure how to do it on my own. PeerJS allowed you to use their servers to interact with the API, so I figured that this was perfect. 


# Server Hosting 

I'm going to fast forward and say that PeerJS ended up not being the best option for me. I liked that PeerJS hosted the signaling server for me because that meant I wouldn't have to do any backend work. After basically completing the project, I realized that I would have to redo almost everything. PeerJS does in fact host the signaling server, but only as a non-https endpoint. The problem with this was that since it was serving files and data from a non-https endpoint, browsers assumed that the data it was serving was hostile. To get around this, users could just ask the browser not to block the data, but that was something each user would have to do every time they visit. I thought about just leaving it like this since this was nothing more than a fun side project, but I saw this as an opportunity to improve my backend skills. The solution was to host the signaling server myself. The issue is that, as I said before, I don't really know how to do this. PeerJS has a tutorial on how to host a PeerJS server manually, but for some reason I could not get it to work. This is when I came across [Socket.io](https://socket.io), which had nice documentation and easy to follow tutorials. Figuring out how to get my own server up and running on [Heroku](https://heroku.com) was pretty straightforward, and with the help of some StackOverflow help I found out how to send the data properly with https enabled. This solved the "unsafe data" problem that I was having earlier. The next problem was changing everything that worked with PeerJS, which is pretty much what I built the entire project on.


# Game Flow

I decided to use Angular for this project because I wanted it to be a single page application. I made a single page application once, so I essentially reused the code from that project. The pages that I was going to have were the home page, the about page, and the game page. The home page would just hold the title banner, an input box, and a "Create Game" button, the about page would just show info about the project itself, and the game page would be where most of the action happens. Since I had control of the signaling server it was pretty easy to contact between two users. Compared to the client code, there wasn't much to do on the serverside. Here is my `index.js` file that handles all server work:

```javascript
var express = require('express'),
http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3000);


app.use("/", express.static(__dirname + '/'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Listen for connections
io.on('connection',function(socket){

    //give ids to new users
    socket.emit("get-id",socket.id);

    socket.on('leave',function(data){
      socket.to(data).emit('leave',null);
    });


    socket.on('request',function(data){
  
      //Data = host id
      //Sends id of guest to host
      socket.to(data).emit("request",socket.id);

      //From host to guest with game setup
      if(Array.isArray(data)){
        socket.to(data[1]).emit('request',data);
      }
    });


    //Relay that the turn is over
    socket.on('turn-over',function(data){
      socket.to(data[2]).emit('turn-over',[data[0],data[1]]);
    });

    //Relay that a player has won
    socket.on('win',function(data){
      socket.to(data[2]).emit('win',data);
    });
});

```

Essentially, a player would send a message to the server with a tag. Let's use the tag `turn-over`. This would signal to the server that the player just finished their turn. Along with the tag `turn-over`, would be an array of data. The array would consist of the coordinates to the chip they placed down, and the unique id of the user they are playing against. With that, the server could send that coordinate data to the users opponent. On the client side, there is this listener:

```javascript
$rootScope.socket.on('turn-over',function(data){
    $rootScope.turn = true;
    $scope.updateGame([data[0],data[1]]);
    $scope.playGame();
});
```

This would tell the user's client that their opponents turn is over, so update the game, and now it is your turn.

That is pretty much how the entire system works. A user sends data to the server with a specific tag, and based on that tag, the server would either relay that info to an opponent, or return to the user with some data.

# Moving Forward

This was a pretty good experience, and a pretty good way to start off my winter break. There are a lot of bugs that I have yet to figure out, so I'll be continuing to work on this for a while. Like I said before, I would still like to create an Alexa Skill, but I don't know when I will get started on that. Time is running out, and I still have not decided what I really want to make. In terms of freelancing, I have come into contact with a possibly new client. Hopefully that pans out because I am itching for more freelancing experience. I hope to have a lot more experience before I transfer at the end of next semester! Anwyays, thank you for reading this, and I hope to see you again in my next post. I would like to apologize for the late post too. My schedule for winter break is quite free so hopefully I'll be able to stay consistent for the next month in a half.

