const fastify = require('fastify')({ logger: true })

const addUrl = require('./routes/add-url')
const index = require('./routes/index')
const urlShortener = require('./routes/url-shortener')

fastify.register(index)
fastify.register(urlShortener)
fastify.register(addUrl)

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
