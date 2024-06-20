## Members Only Message Board
![Screenshot of page](/public/images/Screenshot%202024-06-19%20at%2010.19.43 PM.png "visual of page")

# Description
This project shows a message board with levels of accessibility based on the type of user that is browsing the page. Users must sign up to post messages on the board. Users have to input a passcode to become a member and see the authors and dates of each post. Users have to input another passcode to become an admin and gain the ability to delete posts.

Passcode to be a member: 1226
Passcord to be an admin: abcd

# Why?
The purpose of this project was to focus on implementing authentication and security in an Express app. Some things I focused on:
* Using passportJS, an authentication middleware
* Using cookies to store user info and keep them logged in for their session
* Practice using MongoDB to store user info and messages for the app
* Using bcryptjs to secure user passwords with hashing and comparing hashed passwords
* storing private data such as database connection string and express session secret safely in a .env file

# Live Site
[https://kindly-honeysuckle-columnist.glitch.me](https://kindly-honeysuckle-columnist.glitch.me)