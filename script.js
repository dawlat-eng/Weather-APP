// 5cb9f81f0ee64b1db91154820240210 //key
//JSON: http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London 
//JSON: http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond
//JSON: http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
const rowData = document.querySelector('.rowData');
const searchInput = document.querySelector('input.search');
const findBtn = document.querySelector('.findbtn');
const apiKey = "5cb9f81f0ee64b1db91154820240210";

//handle form
const form = document.forms[0];  //to choose the form no. one 
form.addEventListener('submit' ,function(e){
    e.preventDefault();
});

const formSubscribe = document.forms[1];   
formSubscribe.addEventListener('submit' ,function(e){
    e.preventDefault();
});

//handle geolocatio for user
async function geoLocation(){
    const response = await fetch(`https://freeipapi.com/api/json/`)
    const geoData = await response.json();
    let city = geoData.cityName;
    // console.log(geoData);  
    getWeatherData(city); //call of city
}
geoLocation();
//get data from api
async function getWeatherData(city){
    try{
        const response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
        if(!response.ok){
            throw new Error("could't fetch data");
        }

        const data = await response.json(); 
        displayWeatherInfo(data);

    }catch(error){
        console.error(error);
        alert("An error occured:" + error.message);
    }
    
}
// async function getWeatherData(city){
//     const response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
//     const data = await response.json(); 
//     displayWeatherInfo(data);
// }

//get search api & btn handle
findBtn.addEventListener('click' , async function(){
    if(searchInput.value === ""){
        alert('please enter the city name')
    }
if(searchInput.value.length>=3){
    const searchUrl = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchInput.value}`;
    const response = await fetch(searchUrl);
    const searchResult = await response.json();
    // console.log(searchResult);
  if(searchResult.length>0){
    getWeatherData(searchResult[0].name)
  }else{
    alert('City Not Found')
  }
}
});

//handle wind direction
function directionName(letter) {
    switch(letter) {
        case 'N':
            return 'North';
        case 'NNE':
            return ' North-Northeast';
        case 'ENE':
            return 'East-Northeast';
        case 'ESE':
            return ' East-Southeast';
        case 'SWS':
            return 'South-Southwest';
        case 'WNW':
            return 'West-Northwest';
        case 'NNW':
            return 'North-Northwest';
        case 'SSE':
            return 'South-SouthEest';
        case 'NE':
            return 'NorthWest'
        case 'E':
            return 'East';
        case 'SE':
            return 'SouthEast'
        case 'S':
            return 'South';
        case 'SW':
            return 'SouthWest'
        case 'W':
            return 'West';
        case 'NW':
            return 'NorthWest'
        default:
            return 'Invalid direction';
    }
}
//handle day 
function getDay(dateString){
let date = new Date(dateString);
const weekName =['Sunday','Monday','Tuesday','wednesday','Thursday','Friday','Satuerday']
return weekName[date.getDay()]
}
//handle month
function getMonth(dateString){
    let date =new Date(dateString);
    const monthName =["January","February","March","April","May","June","July","August","September","October","November","December"]
    return date.getDate()+' '+ monthName[date.getMonth()]
}
//display data
function displayWeatherInfo(data){
let cartona ='';

cartona =` <div class="col-md-4 px-0 gy-3">
                <div class="card today text-white text-center h-100">
                    <div class="card-head p-2 d-flex justify-content-between">
                        <span class="day mb-0">${getDay(data.forecast.forecastday[0].date)}</span>
                        <span class="date mb-0">${getMonth(data.forecast.forecastday[0].date)}</span>
                    </div>
                    <div class="card-body p-3">
                        <h6 class="fs-4" id="city">${data.location.name}</h6>
                        <h3 class="py-2 mb-0" id="temp">${data.current.temp_c}°C</h3>
                        <img src="https:${data.current.condition.icon}" alt="Sunny">
                        <div class="text-primary my-1" id="desc1">${data.current.condition.text}</div> 
                      
                        <div class="py-4 ico-size">
                            <span class="me-3">
                                <img src="./imges/imges4.png" alt="rainposition">
                              <span id="rainPos1">${data.current.humidity}%</span> 
                            </span>
                            <span class="me-3">
                                <img src="./imges/imges5.png" alt="windspeed">
                                <span id="windSpeed1">${data.current.wind_kph}kph</span>
                            </span>
                            <span class="me-3">
                                <img src="./imges/imges6.png" alt="winddirction">
                                <span id="windDir1">${directionName(data.current.wind_dir)}</span>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
            
                <div class="col-md-4 px-0 gy-3">
                  <div class="card tomorrow text-white h-100">
                    <div class="card-head p-2 text-center">
                        <span id="day mb-0">${getDay(data.forecast.forecastday[1].date)}</span>
                    </div>
                    <div class="card-body p-3 text-center">
                        <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="sunny" class="my-5" id="icon2">
                        <div class="day-temp text-white fs-3 fw-bold" id="max2">${data.forecast.forecastday[1].day.maxtemp_c}°C</div>
                        <div class="night-temp fs-6 text-white" id="min2">${data.forecast.forecastday[1].day.mintemp_c}°C</div>
                        <div class="text-primary py-2" id="desc2">${data.forecast.forecastday[1].day.condition.text}</div>
                    </div>
                </div>
              </div>

                <div class="col-md-4 px-0 gy-3">
                  <div class="card twoDays h-100 text-white">
                    <div class="card-head p-2 text-center">
                        <span id="day mb-0">${getDay(data.forecast.forecastday[2].date)}</span>
                    </div>
                    <div class="card-body text-center p-3">
                        <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="sunny" class="my-5" id="icon3">
                        <div class="day-temp text-light fw-bold fs-3 " id="max3">${data.forecast.forecastday[2].day.maxtemp_c}°C</div>
                        <div class="night-temp fs-6 text-white" id="min3">${data.forecast.forecastday[2].day.mintemp_c}°C</div>
                        <div class="status text-primary py-2" id="desc3">${data.forecast.forecastday[2].day.condition.text}</div>
                    </div>
                </div>
                </div>`

rowData.innerHTML=cartona;
}
//handle email validation
document.getElementById('subscribeBtn').addEventListener('click', function() {
    const emailInput = document.getElementById('emailInput').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (emailInput === "") {
        alert('Please enter your email address.');
    } else if (!emailPattern.test(emailInput)) {
        alert('Please enter a valid email address.');
    } else {
        alert('Thank you for subscribing!'); 
        document.getElementById('emailInput').value = ""; // Clear the input after subscription
    }
});

