const options = {
    method: 'GET',
    headers: {
    Accept: 'application/json',
    Authorization: '<fsq3P8wo1bQwkPgXoTJP56jjL/1bUtKoWC5BYf2RGYhvDKg=>'
    }
}
let limit = 5
let lat = <LATITUDE COORDINATES>[0]
let lon = <LONGITUDE COORDINATES>[1]
let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
let data = await response.text()
let parsedData = JSON.parse(data)
let businesses = parsedData.results