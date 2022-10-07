async function get(url) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let response = await fetch(url, requestOptions);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
        console.log(json)
        return json
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
// };
// let response = await fetch("https://countriesnow.space/api/v0.1/countries/flag/unicode", requestOptions);
// if (response.ok) { // если HTTP-статус в диапазоне 200-299
//     // получаем тело ответа (см. про этот метод ниже)
//     let json = await response.json();
//     console.log(json)
//     // json.data.forEach(country => {
//     //     (country.name)
//     // })
// } else {
//     alert("Ошибка HTTP: " + response.status);
// }

function createTicket(price, company){
    const newDiv = document.createElement("div")
    newDiv.classList.add("flex", "py-4", "px-8", "border-2", "w-2/5", "mx-auto")
    const newPrice = document.createElement("p")
    newPrice.classList.add("font-sans", "font-bold", "text-lg", "mr-5")
    newPrice.textContent = `${price}₽`
    const newAirCompany = document.createElement("p")
    newAirCompany.textContent = `Авиакомпания - ${company}`
    newDiv.appendChild(newPrice)
    newDiv.appendChild(newAirCompany)
    return newDiv
}

function createCity(name){
    const newLi = document.createElement("li");
    const newA = document.createElement("a");
    
    newA.classList.add("d-item", "block", "py-2", "px-4", "hover:bg-gray-100", "dark:hover:bg-gray-600", "dark:hover:text-white")
    newA.text = name
    newLi.id = name
    newLi.appendChild(newA)
    
    return newLi
}
function createAirport(name){
    const newA = document.createElement("a");
    
    newA.classList.add("d-item", "block", "ml-4", "py-2", "px-4", "hover:bg-gray-100", "dark:hover:bg-gray-600", "dark:hover:text-white")
    newA.text = name
    
    return newA
}