import { belongsTo, createServer, hasMany, Model, Serializer } from 'miragejs'
import moment from 'moment'

const DefaultSerializer = Serializer.extend({
  include: ['dataPoints'],
  embed: true,
  root: false,
})

const PlantSerializer = DefaultSerializer.extend({
  serialize() {
    let json = Serializer.prototype.serialize.apply(this, arguments)
    if (this.request.method === 'GET')
      return json.map(plant => {
        return {
          ...plant,
          dataPoints: plant.dataPoints.sort((a, b) => {
            return moment(a.date).diff(b.date)
          }),
        }
      })
    return json
  },
})

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
      application: PlantSerializer,
    },

    seeds(server) {
      const lettuce = server.create('plant', { name: 'Lettuce', type: 'Leaf' })
      server.create('plant', { name: 'Tomato', type: 'Cherry' })
      server.create('dataPoint', {
        plant: lettuce,
        date: '2021-04-01T12:24:31.987Z',
        soilMoisture: 100,
        soilTemperatureF: 75.2,
        soilTemperatureC: 24,
        airTemperatureF: 78.8,
        airTemperatureC: 26,
      })
      server.create('dataPoint', {
        plant: lettuce,
        date: '2021-04-03T12:24:31.987Z',
        soilMoisture: 100,
        soilTemperatureF: 75.2,
        soilTemperatureC: 24,
        airTemperatureF: 78.8,
        airTemperatureC: 26,
      })
      server.create('dataPoint', {
        plant: lettuce,
        date: '2021-04-02T12:24:31.987Z',
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
        return schema.plants.all().sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      })

      this.get('/plant/:id', (schema, request) => {
        const id = request.params.id
        return schema.plants.find(id)
      })

      this.del('/plant/:id', (schema, request) => {
        const id = request.params.id
        schema.plants.find(id).destroy()
      })

      this.post('/plant', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        return schema.plants.create(attrs)
      })

      this.post('/dataPoint', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)

        return schema.dataPoints.create(attrs)
      })

      this.del('/dataPoint/:id', (schema, request) => {
        const id = request.params.id
        schema.dataPoints.find(id).destroy()
      })

      this.passthrough()
      this.passthrough('https://chireia.us.auth0.com/**')
    },
  })

  return server
}
