var socket = io.connect('http://localhost')
var projects = document.querySelector('#projects')

var source = '\t<h2>{{name}}</h2>\n' +
    '\t<p><a href="{{url}}" target="_blank">{{name}}</a></p>\n'
var template = Handlebars.compile(source)
function addProject(url,name){
  var a = document.createElement('article')
  projects.appendChild(a).innerHTML = template({url: url, name: name})
}

socket.on('list projects', function(list){
  list.forEach(function(project){
    addProject(project.url, project.name)
  })
})

socket.on('announce', function(project){
  console.log('new project')
  console.log(project)
  addProject(project.url, 'test')
})