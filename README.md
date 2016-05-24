# Project Discover


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
