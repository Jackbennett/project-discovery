var socket = io.connect(document.location.origin)

var app = new Vue({
  el: '#app',
  data: {
    list: [
      {state: true, title: 'Example project', url: 'http://example.com'}
    ]
  },
  methods: {
    up: function(project){
      for (var i = 0; i < this.list.length; i += 1) {
        if (this.list[i].url.toLowerCase() === project.url.toLowerCase()) {
          return this.list[i].state = true
        }
      }
      return this.list.push(project)
    },
    down: function(project){
      for (var i = 0; i < this.list.length; i += 1) {
        if (this.list[i].url.toLowerCase() === project.url.toLowerCase()) {
          return this.list[i].state = false
        }
      }
    }
  }
})

socket.on('allProjects', function (list) {
  console.log('Sync all projects')
  list.forEach( app.up )
})

socket.on('new', function (project) {
  console.log('new project')
  app.up(project)
})

socket.on('down', function (project) {
  console.log('project offline')
  app.down(project)
})