# Project Discovery Server

Hosts a page to view announced projects for humans to discover.
This is used in a school to get students viewing and share each others programming work to keep lessons exciting. It can show all the projects that have been going on and indicates when they're online for viewing.

## How To Use

1. Clone/download/copy the code to a folder
1. Navigate to that folder `project-discovery/server` and run npm install
1. run `npm run start`
1. Go to [http://localhost:3000/](http://localhost:3000/)

You should find this server itself announced as the first project

## To install
From the above you now know how to start the server. There's extra steps an administrator can do to their network that makes this module work a lot smoother for students.

Create a GPO to prepare the environment for hosting a server. The announce module will pick up environment settings which means you can avoid students having to get details correct.
Property Name| Description
-|-
PORT | TCP port number allowing inbound traffic through the client firewall
API | Url of the server this will be running the server component projects should advertise too.

### firewall
Allow the port you set the environment variable for inbound TCP traffic, you might want to restrict it to the specific process node.exe. Do not set secure only.

### Example config
Create a GPO for the computers or users you want to preset options for. Either `Computer configuration > Preferences > windows Settings > Environment`. You'll probably want to tick "remove this item when it is no longer applied".

Available are;
name | Description | Example
-|-|-
NODE_ORG_API | Set the url to a server that runs programmably accessible infromation | api.example.com
NODE_PORT | Number value a client computer can assume it should use | 8080

Our domain has a firewall exclusion for inbound and outbound traffic to 8000-8100 for the `node.exe` proccess on all classroom PC's. This allows students some flexibility for running and sharing mulitple projects.

## Known Issues
