import {
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from 'miragejs'

export function makeServer() {
  const server = createServer({
    models: {
      plant: Model.extend({
        dataPoints: hasMany(),
      }),
      dataPoint: Model.extend({
        plant: belongsTo(),
      }),
    },
    serializers: {
      application: RestSerializer.extend({
        include: ['dataPoints'],
        embed: true,
        root: false,
      }),
    },

    seeds(server) {
      server.create('plant', { name: 'Lettuce', type: 'Leaf' })
      let tomato = server.create('plant', { name: 'Tomato', type: 'Cherry' })
      server.create('dataPoint', {
        plant: tomato,
        date: '2021-03-31T01:24:31.987Z',
        soilMoisture: 100,
        soilTemperatureF: 75.2,
        soilTemperatureC: 24,
        airTemperatureF: 78.8,
        airTemperatureC: 26,
      })
    },

    routes() {
      this.namespace = 'api'

      this.get('/plant', schema => {
        return schema.plants.all()
      })

      this.get('/plant/:id', (schema, request) => {
        let id = request.params.id
        return schema.plants.find(id)
      })

      this.del('/plant/:id', (schema, request) => {
        let id = request.params.id
        schema.plants.find(id).destroy()
      })

      this.post('/plant', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.plants.create(attrs)
      })

      this.post('/dataPoint', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.dataPoints.create(attrs)
      })

      this.del('/dataPoint/:id', (schema, request) => {
        let id = request.params.id
        schema.dataPoints.find(id).destroy()
      })

      this.passthrough()
      this.passthrough('https://chireia.us.auth0.com/**')
    },
  })

  return server
}
