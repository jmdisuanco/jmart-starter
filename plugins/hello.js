const { exec, spawn } = require('child_process')
const pkg = require('../package.json')
const api = () => {
  console.log('-----> api server <------')
  var net = require('net')

  var server = net.createServer(function(socket) {
    const run = (cmd, params = []) => {
      const system = spawn(cmd, params, { shell: true })

      system.stdout
        .on('data', (data) => {
          console.log(data + '\r\n')
          socket.write(data.toString() + '\r\n')
        })

        .on('error', (msg) => {
          console.log(msg)
        })
    }

    socket.write('JMArt REPL Server \r\n')
    socket.on('data', (msg) => {
      let message = msg.toString().split(' ')
      message.forEach((el) => {
        console.log(el.replace('\n', ''))
      })
      console.log(typeof message === 'string', message)
      switch (message[0].replace('\n', '')) {
        case 'install': {
          run(`npm i ${message[1]}`)
          break
        }
        case 'uninstall': {
          run(`npm uninstall ${message[1]}`)
          break
        }
        case 'list': {
          socket.write(JSON.stringify(pkg.dependencies))
          break
        }
      }
    })
    socket.on('error', (msg) => {
      console.log(msg)
    })
  })

  server.listen(1337, '0.0.0.0')
}

class HelloWorld {
  apply(compiler) {
    //console.log(compiler.hooks.failed.tap)
    compiler.hooks.done.tap({ name: 'HelloWorld' }, () => {
      api()
    })
  }
}

module.exports = HelloWorld
