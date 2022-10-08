async function get(url) {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    }
    let response = await fetch(url, requestOptions);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let json = await response.json();
        console.log(json)
        return json
    } else {
        alert("Ошибка HTTP: " + response.status);
        throw "Couldn't http get"
    }
}

async function findCities(queryCityName, parentInput, parentDropdown) {
    let onClick = (event) => {
        console.log(event.target.text)
        parentInput.value = event.target.text
    }

    let matchingCities = await get(
        `https://autocomplete.travelpayouts.com/places2?locale=ru&types[]=airport&types[]=city&term=${queryCityName}`
    )
    let cities = {}
    matchingCities.forEach(item => {
        if (item.type === 'city') {
            cities[item.name] = {
                city: createCity(item.name, item.code, onClick),
                airports: []
            }
        }
    })

    matchingCities.forEach(item => {
        if (item.type !== 'airport' || cities[item.city_name] === undefined) {
            return
        }
        let newAirport = createAirport(item.name, item.city_name, onClick)
        cities[item.city_name].airports.push(newAirport)
    })

    // console.log(cities)
    parentDropdown.replaceChildren()
    for (let key of Object.keys(cities)) {
        cities[key].airports.sort((a, b) => 1 ? a.text < b.text : -1)

        parentDropdown.appendChild(cities[key].city)
        cities[key].airports.forEach(airport => {
            parentDropdown.appendChild(airport)
        })
    }
}

function createCity(cityName, cityIATA, onClick) {
    const cityDiv = document.createElement("div");

    cityDiv.className = "transition-colors first:shadow-t first:shadow-l first:shadow-r ease-in duration-75 hover:bg-emerald-300 hover:bg-opacity-60 hover:opacity-100 opacity-80 p-1 first:pt-[0.385rem] last:pb-[0.385rem] border-gray-400 border-r border-l first:rounded-t-md first:border-t last:border-b last:rounded-b-md"
    cityDiv.text = cityName
    cityDiv.id = `city-${cityIATA}`
    cityDiv.addEventListener('click', (event) => {
        console.log('Clicked')
        onClick(event)
    })
    cityDiv.innerText = cityName

    return cityDiv
}

function createAirport(airportName, onClick) {
    const airportDiv = document.createElement("div")

    airportDiv.className = "transition-colors first:shadow-t first:shadow-l first:shadow-r ease-in duration-75 hover:bg-emerald-300 hover:bg-opacity-60 hover:opacity-100 opacity-80 p-1 first:pt-[0.385rem] last:pb-[0.385rem] border-gray-400 border-r border-l first:rounded-t-md first:border-t last:border-b last:rounded-b-md"
    airportDiv.text = airportName
    airportDiv.id = `airport-${airportName}`
    airportDiv.onclick = onClick
    airportDiv.innerHTML = `<span class="ml-4">${airportName}<span>`

    return airportDiv
}