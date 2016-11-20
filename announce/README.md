# Project Discovery Announcer

This module sends a POST message about your project that just started running and the url to view it.
A server listening for this message can print this title and url onto a page for other users to find.

This is for environments where users (students) can be stopping/starting their work constantly and from a variety of computers which makes a fixed address impractical.
Use the server component to host a page for students to find each others work online during a lesson.
It's designed so a class can just focus on creating their own work but easily find their classmates in-progress work to view.

The server component can be found on [github](https://github.com/Jackbennett/project-discovery) where this module is also included.

# Usage
Just require the module with the URL path to a server it should send status messages to. Then announce your project is available with an object containing some information.

```javascript
var announce = require('project-discovery-announce')('http://api.example.com/announce')

// ... Application code here

server.listen(port, hostname, () => {
    console.log(`${hostname}:${port} ready.`)
    announce.up({"port": port})
})
```

# Methods
## up([options])
function can accept an object to customize the project title and url that is advertised. If no options are set these will be guessed

available options are;
name | type | default| description
-----|------|--------| -----------
title | string | Formatted URL value | What title to display on the page
hostname | string | computer name | Guessed from the current system name
port | number | 3000 | the port to access your project on
url | string | guessed from port and hostname | Override to an exact url you choose

```javascript
{
    'title': 'Test Site A',
    'hostname': 'computername',
    'port': 8080,
    'url': 'http://example.com'
}
```
