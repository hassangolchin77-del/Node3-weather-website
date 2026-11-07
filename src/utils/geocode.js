

const geocoding = async (address, callback)=>{
  try{
    const url2 = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
    const response = await fetch(url2 , {
         headers: {
                'User-Agent': 'WeatherAppNodeJS/1.0 (https://github.com/myusername/weather)',
            }
    } )
    const data = await response.json()
    const {error, length} = data
    if (error || length === 0){
       return callback("makan peyda nashod makane digari talash konid!", undefined)
    }
    const FirstData = data[0] 
    const {lat, lon, name} = FirstData
    callback(undefined ,{
            lat: lat,
            lon: lon,
            location: name
        }
    )
  }catch(error){
    callback(`net ghate :I: ${error.message}`, undefined)
  }
}

export{
    geocoding
}