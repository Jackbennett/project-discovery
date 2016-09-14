var socket = io.connect(document.location.origin)
var projects = document.querySelector('#projects')
var projectUI = {
  template: function () {
    var source = '<div class="status {{state}}"></div>\n' +
      '\t<a href="{{url}}" target="_blank">\n' +
      '\t<h2>{{title}}</h2>\n' +
      '\t<p>{{url}}</p></a>\n'
    return Handlebars.compile(source)
  }(),
  list: [],
  update: function (url, name, state) {
    var update = this.list.find(function (project) {
      return project.url === url
    })
    if(update){
      update.state = state ? "on" : "off"
    } else {
      this.list.push({
        url: url,
        name: name,
        state: state
      })
    }
    this.paint()
  },
  remove: function (p) {
    for (var i = 0; i < this.list.length; i += 1) {
      if (this.list[i].url.toLowerCase() === p.url.toLocaleLowerCase()) {
        delete this.list[i]
      }
    }
    this.paint()
  },
  paint: function () {
    var self = this
    var dom = []
    projects.innerHTML = null

    this.list.forEach(function (p) {
      var a = document.createElement('article')
      a.innerHTML = self.template(p)
      dom.push(a)
    })
    dom.forEach(function (d) {
      projects.appendChild(d)
    })
  }
}

socket.on('list projects', function (list) {
  list.forEach(function (project) {
    projectUI.update(project.url, project.name, true)
  })
  projectUI.paint()
})

socket.on('new', function (project) {
  console.log('new project')
  console.log(project)
  projectUI.update(project.url, project.name, true)
})

socket.on('down', function (project) {
  console.log('project offline')
  console.log(project)
  projectUI.update(project.url, project.name, false)
})