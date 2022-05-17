let latitude, longitude
let city = 'Yaroslavl'
const app = document.querySelector('.app')
//let URLweatherApi_1 = 'https://api.weather.yandex.ru/v2/informers?lat=57.55659866333008&lon=39.83418273925781&[lang=ru_RU]'



function success(pos) {
  latitude = pos.coords.latitude
  longitude = pos.coords.longitude
  accuracy = pos.coords.accuracy
  //UrlgeocoderApi_1 = `https://api.geotree.ru/address.php?lon=${longitude}&lat=${latitude}&key=TeHyV1gNtqXi`
  //UrlgeocoderApi_2 = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=13&addressdetails=1`
  console.log('longitude - ', longitude, 'latitude - ', latitude)
  fetchdata(longitude, latitude)
}

const reject = async function(err) {
  console.log(`(${err.code}): ${err.message}`)
  const result = await fetch('http://ip-api.com/json/').catch((e) => {
    console.log(e)
  })
  let data
  if(result){
    data = await result.json().catch((e) => {
      console.log(e)
    })
  }
  latitude = data.lat
  longitude = data.lon
  fetchdata(longitude, latitude)
}
navigator.geolocation.getCurrentPosition(success, reject, {
  timeout: 4000,
  enableHighAccuracy: false,
})



const fetchdata = async (longitude, latitude) =>{
  //const url = `http://api.weatherstack.com/current?access_key=1e304563fcb2a52e6e76c0a453028095&query=${latitude},${longitude}`   ограничено
  //const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=0f5536e73337f7ca55370176430b4b70`
  const url = `https://ru.wttr.in/${latitude},${longitude}?format=j1`
  const result = await fetch(url)
  const data = await result.json().catch((e) => {
    console.log(e);
  })
  console.log(data)
  app.innerHTML += JSON.stringify(data)
}