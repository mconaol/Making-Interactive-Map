let map;
let markers = [];

//Generating a map

async function createMap() {
    let coords = await getCoords();
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // User Marker
    if (coords) {
        let marker = L.marker(coords).addTo(map);
        marker.bindPopup("You are Here").openPopup();
    }
    // Search Function for business type

  //  document.getElementById('submit').addEventListener('click', function () {
  //      selectBusinessType();
   // });
}

//Actions 
async function getCoords() {
   const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [pos.coords.latitude, pos.coords.longitude];
}

// ... (your existing code)

async function selectBusinessType (){
    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: 'fsq3P8wo1bQwkPgXoTJP56jjL/1bUtKoWC5BYf2RGYhvDKg='
        }
    };
    let limit = 5;

    let [lat, lng]= await getCoords();
    let businessDropdown = document.getElementById('businessTypeDropdown');
    let selectedBusiness = businessDropdown.value;

    let business = ['coffee','restaurant','hotel','market'];
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lng}`, options);
    let data = await response.text();
    let parsedData = JSON.parse(data);
    let businesses= parsedData.results;
    return businesses

clearMarkers()
    addMarkers()
}

function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.location.lat,
			long: element.location.lng,
		};
		return location
	})
	return businesses
}


function addMarkers(businesses) {
    console.log('adding markers')

    for (let i = 0; i < businesses.length; i++) {
        const location = businesses[i].location;
        if (location && location.lat && location.lng) {
            markers.push(
                L.marker([
                    location.lat,
                    location.lng,
                ])
                    .bindPopup(`<p1>${businesses[i].name}</p1>`)
                    .addTo(map)
            );
        }
    }
}

function clearMarkers() {
    console.log('Clearing Markers')
    markers.forEach((marker) => {
        map.removeLayer(marker);
    });
    markers = [];
}

document.getElementById('submit').addEventListener('click', async function() {
    let data = await selectBusinessType();

    //Add Markers
    let businesses = processBusinesses(data);
    clearMarkers();
    addMarkers(businesses);
});
// window load
window.onload = createMap()
