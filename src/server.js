import { createServer, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      plant: Model,
    },

    seeds(server) {
      server.create('plant', { name: 'Letuce', type: 'Vegetable' })
      server.create('plant', { name: 'Tomato', type: 'Vegetable' })
    },

    routes() {
      this.namespace = 'api'

      this.get('/plant', schema => {
        return schema.plants.all()
      })

      this.post('/plant')

      this.passthrough()
      this.passthrough('https://chireia.us.auth0.com/**')
    },
  })

  return server
}
