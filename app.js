'use strict';

const Hapi = require('hapi');
// initialize server

const server = new Hapi.server({
  port: 3003,
  host: 'localhost'
});

// start server


server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello, world';
  }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

const init = async () => {

  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return h.file('./public/hello.html');
    }
  });


  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
