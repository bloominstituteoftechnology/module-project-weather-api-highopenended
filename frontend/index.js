async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]
  const arrWeekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  // 👉 Tasks 1 - 5 go here
  let weatherWidget=document.querySelector('div#weatherWidget');
  let cityDropdown = document.querySelector('#citySelect');
  let pInfo = document.querySelector('p.info');
  
  weatherWidget.style.display='none';
  
  cityDropdown.addEventListener('change',()=>{

    // Hide everything
    cityDropdown.disabled=true;
    pInfo.textContent='Fetching weather data...';
    weatherWidget.style.display='none';

    let myUrl = 'http://localhost:3003/api/weather' + (cityDropdown.value ==='San Francisco' ? '' : `?city=${cityDropdown.value.replace(' ','+')}`);
    
    axios.get(myUrl)
      .then(res=>{
        let dataCurr=res.data.current;
        weatherWidget.style.display='block';

        // Little weather symbol
        let iconVal=descriptions[descriptions.map(val=>val[0]).indexOf(dataCurr.weather_description)][1];

        let divLocation=document.querySelector('#location');
        let divWeatherDescr=document.querySelector('#todayDescription');
        let divApparentTemp=document.querySelector('#apparentTemp');        
        let divCurrStats=document.querySelector('#todayStats');
        let divForecast=document.querySelector('#forecast');


        // 1) Location
        divLocation.children[0].textContent=cityDropdown.value;
        
        // 2) Today
        divWeatherDescr.textContent=iconVal;
        divApparentTemp.children[1].textContent=`${dataCurr.apparent_temperature}°`;
        divCurrStats.children[0].textContent=`${dataCurr.temperature_min}°/${dataCurr.temperature_max}°`;
        divCurrStats.children[1].textContent=`Precipitation: ${dataCurr.precipitation_probability*100}%`
        divCurrStats.children[2].textContent=`Humidity: ${dataCurr.humidity}%`
        divCurrStats.children[3].textContent=`Wind: ${dataCurr.wind_speed}m/s`

        // 3) Forecast Days
        for (let i = 0; i < divForecast.children.length; i++) {
          const divCol = divForecast.children[i];          
          let dataFC = res.data.forecast.daily[i];
          divCol.children[0].textContent=arrWeekdays[new Date(dataFC.date).getUTCDay()];
          divCol.children[1].textContent=descriptions[descriptions.map(val=>val[0]).indexOf(dataFC.weather_description)][1];
          divCol.children[2].textContent=`${dataFC.temperature_min}°/${dataFC.temperature_max}°`;
          divCol.children[3].textContent=`Precipitation: ${dataFC.precipitation_probability*100}%`;
        }
        pInfo.textContent='';
      })
      .catch(err=>{
          console.log(err.message);
        }
      )
      .finally(()=>{
        pInfo.textContent='';
        cityDropdown.disabled=false;
      });
  });


  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
