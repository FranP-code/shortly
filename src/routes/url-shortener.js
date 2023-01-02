module.exports = async function (fastify, options) {
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    return { test: id }
  })
}
