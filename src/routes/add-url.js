module.exports = async function (fastify, options) {
  fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret123'
  })

  fastify.post('/add', (req, reply) => {
    // some code
    const token = fastify.jwt.sign({ abc: 123 })
    console.log(token)
    reply.send({ token })
  })

  fastify.listen({ port: 3000 }, (err) => {
    if (err) throw err
  })
}
