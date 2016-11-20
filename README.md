![Project Logo](https://raw.githubusercontent.com/jackbennett/project-discovery/master/logo.png)

# Project Discovery

Say you've got a room of people learning the web. Wouldn't it be great of they could easily view each others work to talk about it and share ideas?

Well, Give them a template that use this announce module as their own server.
There's an [example](example/) in this github.
Read the [announce](announce/) document for how this works.
You'll need a copy of the [server](server/) running somewhere, it works best as your classroom PC and looks great on the board.

![Screenshot](https://raw.githubusercontent.com/jackbennett/project-discovery/master/screenshot.png)

## Status

Very much a work in progress to learn;

- How to make a module

## Plan

`announce/` will contain the module code required for sub-projects to pull in and declare their state with.
Post the computer name and url:port that allows access to the service to advertise. Possible maintain a connection.
On process exit post a message that the server is now offline.

`server/` is the code to receive the state message and present a UI to view the running projects.
When receiving a post message it will add the location of the project to a page for other users to find.
When receiving an offline announcement it will indicate that state in some way.
Could potentially listen to the closing of the http connection for the announced service for this. 

### Development

As the module `project-discovery-announce` is unpublished, use npm link to add it for the server to run.
npm link will not work in folders mapped over the network.

- Only append unique URL's to the page
- Receive a project down message
