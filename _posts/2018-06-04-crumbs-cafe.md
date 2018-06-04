---
layout: post
title:  "Free Food With React"
permalink: /free-food-with-react/
edited: 2018-06-04 09:31:37 -0400
published: true
author: Nicholas Morris
description: The progress I've made on a large project I've been working on 
comments: true
---

Several months ago I was casually browsing Reddit, and I saw someone make a post about how when they were in college they would visit this bulletin
board on their and take note of every even that was giving out free food. They said that they would collect this data and put it all in a spreadsheet. With this data they were able to save money and recieve free food several times a week. They even mentioned that they were able to go an entire week without spending money on food once.


As soon as I read this a wonderful idea popped into my head. "What if this system could be somewhat automated, and crowdsourced?". What if instead of having to go out and look at this bulletin board every week, you could just open an app on your phone and get the same results? This thought was so compelling, I decided to actually try and develop something like this. It would soon be called Crumbs Cafe.

# Getting Started


So the idea is fairly simple, so making the app should be simple too right? Normally the answer would be no, but in this case there aren't too many complicated tasks to be done. Honestly so far it's just been very tedious, as it is quite a bit of work. The first thing that I had to decide what I would develop this with. Originally I wanted to work with React Native because I had never used it before, but I quickly learned that I wouldn't be able to test the app on iOS devices without having a Mac. This disqualified developing this as an app at all because I didn't want to miss out on having the app available to iOS users. While mobile OS vary's wildely from college to college, according to comScore, about 53% of smartphone users in the U.S are on Android devices, so that leaves an untouched 44% of possible users (3% on Windows & Blackberry). This doesn't even include the stats that show what the share is at specific colleges. (ie: Only 17% of students at Rhode Island School of Design are using Android phones) 


With this info in mind, it was a no brainer to develop this as a web app instead. At first I was a little weary about this idea, and I have recieved a bit of flack because of the decision, but I think this pays off in the long run. I've always thought that if this project recieves any popularity or recognition I could take a look at the benefits of developing a native app. Now that I have decided that I would be building with React on the web, I threw together a small (and crude) prototype to demonstrate what I wanted the app to look like.
![First Mockup](https://preview.ibb.co/gcZYTT/20180604_121728.png)


Essentially I wanted a feed that displayed the name of the event, the distance from the user, and some other info about the event. Once you selected the event a small map would slide out from the card and you would be able to see exactly where it is. For some reason when I first made that I didn't really see any issues with it. I now know that this is a UX nightmare for a number of reasons. The next couple of iterations were fairly similar, but provided more info to the user.


Eventually I decided to have the same card view, but once the user selects a card, the view is then converted into a fullscreen view. This gave me a lot more space to add necessary info. The question was how should I go about doing that transition. After a lot of searching on the internet I came accross this ![test](https://static.collectui.com/shots/4178615/landscapes-of-europe-ui-concept-large)

I liked this a lot so I decided to recreate it, but that was very much easier said than done. I like to consider myself pretty crafty when it comes to CSS, but this proved to be a huge challenge. After a lot of experimenting and googling, I ended up with this:

![Rough Draft Gif](https://i.imgur.com/Ep7ERfN.gif)

I was honestly in love with this UI. I thought it was clever, usable, and smooth. The feed allowed users to see what's immediately near them, and what each event is serving. Clicking the underlined location in the fullscreen view would open up Google Maps (or Apple Maps), and the user would be able to navigate to the event. Everything seemed perfect until I tried viewing more than 4 or 5 events on mobile. Because each card was being animated, it would begin to lag a bit. I tried for several hours to try and optimize this to reduce lag, but I couldn't figure anything out, so I had to try something else out. I was pretty discouraged by this and I couldn't think of anything so I ended up taking a fairly large break on the project.


After coming back I decided to mimic Twitter's switch to a fullscreen view. The selected view slides in from the right, and the original view kind of falls further into the background. This one was much easier to replicate and it solved an issue I was having earlier. Before, each card had its own map. The map provider I am using is Mapbox, and they allow 50k free map views per month. With this latest version, I am just using one map and moving the center of the map. This significantly cuts down on the number of times a map is viewed.

![Current Draft Gif](https://i.imgur.com/KQMCIlF.gif)


# Backend

I'm primarily a frontend dev, so backend stuff is usually beyong me, but I am using node for backend and firebase for saving data. Some may groan at the thought of using node, but not much is happening at the backend so no need to worry. It is essentially acting as a middleman between the user and the database. The only direct contact between the client and the database is when they need to sign in. So far I have had no issues with the backend since firebase makes saving and modifying data super easy.

# Moving Forward

This was a pretty shallow look at the app, but I just wanted to start writing about it so I can make it a habit. There was a lot more that happened in between beginning the app and now, but I do not want to write about too much just yet. I am on summer break at the moment so I plan on writing about the app every week until I release the app. I originally planned on releasing a beta this summer, but after some thinking and talking to someone who has created something similar (more on that later), I have decided to spend the summer polishing the app and building exposure. I feel that this will provide the highest chance of success. If you have any questions about the app or suggestions please feel free to let me know either in the comments or directly on social media!


