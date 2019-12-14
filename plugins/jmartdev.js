const { exec, spawn } = require('child_process')
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
    //ctx.ws.send(`Connected via url${ctx.req.getUrl()}`)
    ctx.ws.send('Welcome to JMArt Svelte REPL Server')
  }
  let WSClose = (ctx) => {
    //ctx.ws.send(`Connected via url${ctx.req.getUrl()}`)
    ctx.ws.send('disconnected from JMArt Svelte REPL Server')
  }

  let WSMessage = (ctx) => {
    const run = (cmd, params = []) => {
      const system = spawn(cmd, params, { shell: true })

      system.stdout
        .on('data', (data) => {
          console.log(data + '\r\n')
          ctx.ws.send(data.toString() + '\r\n')
        })

        .on('error', (msg) => {
          console.log(msg)
        })
    }

    try {
      console.log('--->', ctx.ws.getRemoteAddress())
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
        case 'list':
          {
            const pkg = fs.readFileSync('./package.json').toString()
            let result = JSON.parse(pkg)
            ctx.ws.send(JSON.stringify(result.dependencies))
            break
          }

          let ok = ctx.ws.send(data.toUpperCase(), ctx.isBinary)
      }
    } catch (e) {
      console.log(e)
    }
  }
  let routes = [
    {
      url: '/',
      GET: HelloWorld,
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
