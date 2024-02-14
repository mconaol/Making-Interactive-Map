let map 

async function getCoords(){
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
    
}

getCoords().then(coords => {console.log(coords)
  map = L.map('map').setView(coords, 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
                                                              


 console.log(coords)
});

// Marker
getCoords().then(coords => {
    if (coords) {
    var marker = L.marker(coords).addTo(map)
    }
})

// business Election
//Submit Button Function 

document.getElementById('submit').addEventListener('click', function() {
    selectBusinessType()

})

async function selectBusinessType (){
    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: '<fsq3P8wo1bQwkPgXoTJP56jjL/1bUtKoWC5BYf2RGYhvDKg=>'
        }
    }
    let limit = 5
    let [lat, lon]= await getCoords();
    let businessType = 'coffee';
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results

    console.log(businesses)
}