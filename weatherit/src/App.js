import React,{ useState } from 'react';

let api={
  key :'c3f5b633365e80fd108bc64869cf771b',
  base: 'http://api.openweathermap.org/data/2.5'
 }
//http://api.openweathermap.org/data/2.5/weather?q=america&unit=metric&APPID=c3f5b633365e80fd108bc64869cf771b

function App() {
  //------------Date -----------
  let DateFormat = String(new window.Date()); //string(new windows.date())
  let CleanDate = DateFormat.slice(3,15)

 
  //-----------setstate
  let [query, setQuery] = useState('');
  let [weather, setWeather] = useState({});


  //Apis
  let search = event => {
    if(event.key === 'Enter'){
      fetch(`${api.base}/weather?q=${query}&unit=metric&APPID=${api.key}`)  
        .then (res => res.json()) //access json
        .then (result => {   //all the json file
          setWeather(result);
          setQuery('');
        });
    }
  }


  return (
    <div className={(typeof weather.main != 'undefined')
    ? (((weather.main.temp-273) < 20)
    ? 'App' : 'App warm') //dibandingkan
    : 'App warm' //else
    }>


      <main>
      <div className="background"></div>
      <div className="search-box">
      <input 
      type = 'text'
      className = 'search-bar'
      placeholder= 'Search Your Place'
      onChange = {e => setQuery(e.target.value)}
      value = {query} 
      onKeyPress = {search}
      />
      </div>

      {(typeof weather.main != 'undefined')?
       <div>
      <div className="location-box">
      <div className="location">{weather.name},  {weather.sys.country} </div>
      <div className="date-time">{CleanDate}
      </div>
      </div>
      <div className="weather-box">
      <div className="temperature">{Math.round(weather.main.temp - 273)}°C </div>
  <div className="weather">{weather.weather[0].main}</div>
      </div>
      </div>: ('') }
      

      </main>
    </div>
  );
}

export default App;
