![Project Logo](https://raw.githubusercontent.com/jackbennett/project-discovery/master/logo.png)

# Project Discovery

Say you've got a room of people learning the web. Wouldn't it be great of they could easily view each others work to talk about it and share ideas?

Well, Give them a template that use this announce module as their own server.
There's an [example](example/) in this github.
Read the [announce](announce/) document for how this works.
You'll need a copy of the [server](server/) running somewhere, it works best as your classroom PC and looks great on the board.

![Screenshot](https://raw.githubusercontent.com/jackbennett/project-discovery/master/screenshot.png)

## Files

### [`announce/`](announce/)
Publish NPM Module "project-discovery-announce" needs to be required by projects that want to announce themselves to the server to be found.
On process exit post a message that the server is now offline.

### [`server/`](server/)
The page that's hosted to list projects as they get announced on the network. Until this handles multiple rooms you might want to run an instance per room.

### [`example/`](example/)
Once the server is running you could rn this example of a webserver that announces itself to the page. Run and kill this to see how the page updates. See that you can change the title each run.

## Teachers
You'll need the network administrators approval of the below section. As for the students you will want to give them a starter template with this ready configure unless server code is what you want to start with. This works best as a follow on from a lesson on the command line. All students need is one command in the template folder `npm run start` and they can be away editing their website.

## Administrators
This is initially designed to be used in a school per classroom as a way to make a classroom activity more interactive. Network administrators can get this set up with some minor addition to the computer policy, they you'll have to give out a small set of files as starter template for each students project.

You'll require node.js to be installed on the client PCs, console access (Powershell recommended), opened firewall ports and thats it. See the [server](server/) readme for clearer instructions.

## Development

Clone this repo and use npm link to add it to your own test project. You could copy the example and remove the package.json dependency on the published version.
npm link will not work in folders mapped over the network.

The server considers each project to be unique by URL.

### Todos
- Only allow clients to announce projects at urls belonging to their hostname
- Pick more option up from the configurations in the network domain.
- Remove stale projects after a time
- Some way to specify what room you want to list projects from.
