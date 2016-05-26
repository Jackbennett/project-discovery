var socket = io.connect(document.location.origin)
var projects = document.querySelector('#projects')

var source = '\t<a href="{{url}}" target="_blank"><h2>{{name}}</h2>\n' +
    '\t<p>{{url}}</p></a>\n'
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