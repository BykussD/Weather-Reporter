const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i")


const key = `c9c6bf3c90eaf47289d59ed2fd84344b`;
const url = `https://api.openweathermap.org/data/2.5/`




locationBtn.addEventListener("click", e => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
    } else {
        console.log("Geolocation desteklenmiyor")
    }
})

function error(error) {
    console.log(error)
    infoTxt.innerText=error.massage;
    infoTxt.classList.add("error")
}

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
})

function requestApi(city) {
    infoTxt.innerText ="sonuçlar geliyor..."
    infoTxt.classList.add("pending")
    let api = `${url}weather?q=${city}&appid=${key}`
    fetch(api).then(response => response.json()).then(results => weatherDetails(results))
}

function success(position) {
    const { latitude, longitude } = position.coords
    let locationApi = `${url}weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(locationApi).then(response => response.json()).then(results => weatherDetails(results))
}

function weatherDetails(data) {
    if(data.cod== 404){
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText=`${inputField.value} şehri bulunamadı`
        console.log(data)
    }
    else{
        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active")
        const city = data.name
        const country = data.sys.country
        const {description, id} = data.weather[0]
        const {feels_like, humidity, temp} = data.main
console.log(data)
        if(id==800){
            wIcon.src = "resimler/clear.svg"
        }else if(id => 200 && id <= 232){
            wIcon.src = "resimler/storm.svg"
        }else if(id => 600 && id <= 622){
            wIcon.src = "resimler/snow.svg"
        }else if(id => 701 && id <= 781){
            wIcon.src = "resimler/haze.svg"
        }else if(id => 801 && id <= 804){
            wIcon.src = "resimler/cloud.svg"
        }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
            wIcon.src = "resimler/rain.svg"
    }

    
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
    wrapper.querySelector(".weather").innerText = description
    wrapper.querySelector(".location").innerText = `${city}, ${country}`
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`
    
    arrowBack.addEventListener("click", () => {
        wrapper.classList.remove("active")
    })

}}