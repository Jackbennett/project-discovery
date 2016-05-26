# Project Discover

1. List the url and name to announced projects.
1. Socket.IO Keeps the list up to date in real time.

## Status

Very much a work in progress to learn;

- How to make a module

## Plan

`announce/` will contain the module code required for sub-projects to pull in and declare their state with.
Post the computer name and url:port that allows access to the service to advertise. Possible maintain a connection.
On process exit post a message that the server is now offline.

`server/` is the code to recive the state message and present a UI to view the running projects.
When recieving a post message it will add the location of the project to a page for other users to find.
When recieiving an offline annoincement it will indicate that state in some way.
Could potentially listen to the closing of the http connection for the announced service for this. 


### Development

As the module `project-discovery-announce` is unpublished, use npm link to add it for the server to run.
npm link will not work in folders mapped over the network.

- Only append unique URL's to the page
- Recieve a project down message