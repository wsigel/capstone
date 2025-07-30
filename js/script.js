function updateLocations(value){
    
    console.log(value);
    
    let select = document.getElementById("locationsList");
    let length = select.options.length;
    for (let i = length-1; i >= 0; i--) {
        select.remove(i);
    }

    if (value == 1) {
        let option = document.createElement("option");
        option.value = 0;
        option.text = "---";
        select.add(option);

        for (let i = 0; i < historicalLocations.length; i++) {
            let option = document.createElement("option");
            option.value = historicalLocations[i].value;
            option.text = historicalLocations[i].description;
            select.add(option);
        }
    }
    else if (value == 2) {
        let option = document.createElement("option");
        option.value = 0;
        option.text = "---";
        select.add(option);

        for (let i = 0; i < museumArtLocations.length; i++) {
            let option = document.createElement("option");
            option.value = museumArtLocations[i].value;
            option.text = museumArtLocations[i].description;
            select.add(option);
        }
    }
    else if (value == 3) {
        let option = document.createElement("option");
        option.value = 0;
        option.text = "---";
        select.add(option);

        for (let i = 0; i < neighborhoodLocations.length; i++) {
            let option = document.createElement("option");
            option.value = neighborhoodLocations[i].value;
            option.text = neighborhoodLocations[i].description;
            select.add(option);
        }
    }
    else if (value == 4) {
        let option = document.createElement("option");
        option.value = 0;
        option.text = "---";
        select.add(option);
        
        for (let i = 0; i < foodNightlifeLocations.length; i++) {
            let option = document.createElement("option");
            option.value = foodNightlifeLocations[i].value;
            option.text = foodNightlifeLocations[i].description;
            select.add(option);
        }
    }
}
 


let historicalLocations = [];
let museumArtLocations = [];
let neighborhoodLocations = [];
let foodNightlifeLocations = [];
let allLocations = [];

function Location(value, description, longitude, latitude) {
    this.value = value;
    this.description = description;
    this.longitude = longitude;
    this.latitude = latitude;
}

function initLocations(){
    historicalLocations.push(new Location("1", "Brandenburg Gate", 13.377775, 52.516266 ));
    historicalLocations.push(new Location("2", "Berlin Wall Memorial", 13.390066, 52.535034));
    historicalLocations.push(new Location("3", "Topography of Terror", 13.383505, 52.506687));
    historicalLocations.push(new Location("4", "Memorial to the Murdered Jews of Europe", 13.378155,  52.513943));

    museumArtLocations.push(new Location("5", "Museum Island", 13.402318, 52.516640));
    museumArtLocations.push(new Location("6", "Jewish Museum", 13.395596, 52.502182));
    museumArtLocations.push(new Location("7", "Neue Nationalgalerie", 13.3673, 52.5093));
    museumArtLocations.push(new Location("8", "Urban Nation Museum for Urban Contemporary Art", 13.367165, 52.489831 ));

    neighborhoodLocations.push(new Location("9", "Kreuzberg", 13.391799, 52.498604));
    neighborhoodLocations.push(new Location("10", "Prenzlauer Berg", 13.4279, 52.5467));
    neighborhoodLocations.push(new Location("11", "Friedrichshain", 13.454293, 52.515816));
    neighborhoodLocations.push(new Location("12", "Mitte", 13.40489, 52.52003));

    foodNightlifeLocations.push(new Location("13", "Markthalle Neun", 13.431830,  52.501987));
    foodNightlifeLocations.push(new Location("14", "Marheineke Markthalle", 13.431830, 52.501987));
    foodNightlifeLocations.push(new Location("15", "Berghain", 13.404954, 52.520008));
    foodNightlifeLocations.push(new Location("16", "Clärchens Ballhaus", 13.404954, 52.520008));   
    
    allLocations = historicalLocations.concat(museumArtLocations, neighborhoodLocations, foodNightlifeLocations);
}

async function displayMap(longitude, latitude, description) {
    
    const position = {
        lat: latitude,
        lng: longitude
    };

    // Load the Google Maps JavaScript API
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Create a map centered at the specified coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
        center: position,
        zoom: 15,
        MapId: "11f0eff212748841eef345b7"
    });

    // Add a marker at the specified coordinates
    const marker = new AdvancedMarkerElement({
        position: position,
        map: map,
        title: description
    });
}

function findLocation(id){
    let location = allLocations.find(loc => loc.value === id);
    if (location) {
        return location;        
    }
    else {
        location = new Location("0", "City of Berlin", 13.404954, 52.520008);
        return location;
    }
}
function updateMap(value) {        
    let location = findLocation(value);
    if (location) {
        displayMap(location.longitude, location.latitude, location.description);
    } else {
        console.error("Location not found");
    }
}

