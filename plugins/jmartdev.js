const { spawn } = require('child_process')
const fs = require('fs')

const JMartdevServer = () => {
  const pinipig = require('pinipig')

  let HelloWorld = function(ctx) {
    ctx.res.setHeader('Content-Type', 'text/html')
    ctx.res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    ctx.res.write('Working') //write a response to the client
    ctx.res.end() //end the response
  }

  let Handshake = (ctx) => {
    let payload = { msg: 'text', data: 'Welcome to JMArt Svelte REPL Server' }
    ctx.ws.send(JSON.stringify(payload))
  }
  let WSClose = (ctx) => {
    let payload = {
      msg: 'text',
      data: 'disconnected from JMArt Svelte REPL Server',
    }
    ctx.ws.send(JSON.stringify(payload))
  }

  const List = (ctx) => {
    const pkg = fs.readFileSync('./package.json').toString()
    let result = JSON.parse(pkg)
    let payload = { msg: 'installed', data: result.dependencies }
    ctx.ws.send(JSON.stringify(payload))
  }
  let WSMessage = (ctx) => {
    const run = (cmd, params = []) => {
      const system = spawn(cmd, params, { shell: true })

      system.stdout
        .on('data', (data) => {
          let payload = { msg: 'system', data: data.toString() }
          ctx.ws.send(JSON.stringify(payload))
          List(ctx)
        })

        .on('error', (msg) => {
          let payload = { msg: 'error', data: msg }
          ctx.ws.send(JSON.stringify(payload))
        })
    }

    try {
      let data = Buffer.from(ctx.message).toString('binary')

      let message = data.toString().split(' ')
      message.forEach((el) => {
        console.log(el.replace('\n', ''))
      })

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
          List(ctx)
          break
        }
        case 'build': {
          run(`npm run build`)
          break
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  let routes = [
    {
      url: '/',
      ws: {
        options: {
          compression: 0,
          maxPayloadLength: 16 * 1024 * 1024,
          idleTimeout: 3000,
        },
        open: Handshake,
        message: WSMessage,
        close: WSClose,
        drain: null,
        close: null,
      },
    },
  ]

  let options = {
    port: 9999,
    routes: routes,
  }

  pinipig.createServer(options)
}

class JMartDev {
  apply(compiler) {
    //console.log(compiler.hooks.failed.tap)
    compiler.hooks.done.tap({ name: 'JMartDevServer' }, () => {
      JMartdevServer()
    })
  }
}

module.exports = JMartDev
