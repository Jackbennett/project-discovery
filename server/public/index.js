var socket = io.connect(document.location.origin)
var projects = document.querySelector('#projects')

var source = '<div class="status {{state}}"></div>\n' +
    '\t<a href="{{url}}" target="_blank">\n' +
      '\t<h2>{{name}}</h2>\n' +
      '\t<p>{{url}}</p></a>\n'
var template = Handlebars.compile(source)
function addProject(url,name,state){
  if(state){ state = 'on'}
  var a = document.createElement('article')
  projects.appendChild(a).innerHTML = template({url: url, name: name, state: state})
}

socket.on('list projects', function(list){
  list.forEach(function(project){
    addProject(project.url, project.name, true)
  })
})

socket.on('new', function(project){
  console.log('new project')
  console.log(project)
  addProject(project.url, project.name, true)
})

socket.on('down', function(project){
  console.log('project offline')
  console.log(project)
  addProject(project.url, project.name, false)
})