const express = require('express');
const app = express();
const xmlparser = require('express-xml-bodyparser');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const cities = [
  {
    id: 1,
    name: "Minsk",
    currentTemperature: 10,
    windSpeed: 20,
    pressure: 1024,
    humidity: 0.49
  },
  {
    id: 2,
    name: "Barcelona",
    currentTemperature: 23,
    windSpeed: 45,
    pressure: 1018,
    humidity: 0.74
  },
  {
    id: 3,
    name: "New York",
    currentTemperature: 19,
    windSpeed: 13,
    pressure: 1018,
    humidity: 0.67
  },
  {
    id: 4,
    name: "Marsel",
    currentTemperature: 19,
    windSpeed: 19,
    pressure: 1018,
    humidity: 0.76
  },
  {
    id: 5,
    name: "Buenos Aires",
    currentTemperature: 25,
    windSpeed: 11,
    pressure: 998,
    humidity: 0.73
  }
]

app.use(xmlparser())

app.post('/cityWeatherDetails', (req, res) => {
  const rawBody = req.rawBody

  if (!rawBody) {
    res.status(400).send('Request body is empty.')
    return
  }

  const cleanedBody = rawBody.toString().trim()

  xml2js.parseString(cleanedBody, (err, result) => {
    if (err) {
      res.status(400).send('An error occurred while processing input data.')
      return
    }

    try {
      const cityId = result['soapenv:Envelope']['soapenv:Body'][0]['web:getWeatherInfo'][0]['web:cityId'][0]

      const cityById = cities.find(city => city.id == cityId)

      if (!cityById) {
        res.status(500).send('There is no city with such id.')
        return
      }

      const xmlResponseTemplate = fs.readFileSync(path.join(__dirname, 'xmlResponseTemplate.xml'), 'utf8')

      const xmlResponse = xmlResponseTemplate
          .replace('${weatherInfo.name}', cityById.name)
          .replace('${weatherInfo.currentTemperature}', cityById.currentTemperature)
          .replace('${weatherInfo.windSpeed}', cityById.windSpeed)
          .replace('${weatherInfo.pressure}', cityById.pressure)
          .replace('${weatherInfo.humidity}', cityById.humidity)
      
      res.set('Content-Type', 'text/xml');
      res.send(xmlResponse);
    } catch (parseError) {
      console.error('Error processing XML structure:', parseError);
      res.status(400).send('An error occurred while processing input data.');
    }
  })
})

app.delete('/deleteCity', (req, res) => {
  const rawBody = req.rawBody

  if (!rawBody) {
    res.status(400).send('Request body is empty.')
    return
  }

  const cleanedBody = rawBody.toString().trim()
  
  xml2js.parseString(cleanedBody, (err, result) => {
    if (err) {
      res.status(400).send('An error occurred while processing input data.')
      return
    }

    try {
      const cityId = result['soapenv:Envelope']['soapenv:Body'][0]['web:getWeatherInfo'][0]['web:cityId'][0]

      if (cityId < 1 || cityId > cities.length) {
        res.status(500).send('There is no city with such id.')
        return
      }

      cities.splice(cityId - 1, 1)

      const xmlResponseTemplate = fs.readFileSync(path.join(__dirname, 'xmlResponseTemplate.xml'), 'utf8')

      let xmlResponse = ''
      cities.forEach((city) => {
        xmlResponse += xmlResponseTemplate
          .replace('${weatherInfo.name}', city.name)
          .replace('${weatherInfo.currentTemperature}', city.currentTemperature)
          .replace('${weatherInfo.windSpeed}', city.windSpeed)
          .replace('${weatherInfo.pressure}', city.pressure)
          .replace('${weatherInfo.humidity}', city.humidity)
      })
      
      res.set('Content-Type', 'text/xml');
      res.send(xmlResponse);
    } catch (parseError) {
      console.error('Error processing XML structure:', parseError);
      res.status(400).send('An error occurred while processing input data.');
    }
  })
})

app.listen(8000, () => {
  console.log('Starting the server on port 8000')
})