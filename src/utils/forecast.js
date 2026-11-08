
const forecast = async (lat, lon, callback) => {
  try {
    const url1 = `https://api.weathermetro.com/v2/forecast?lat=${lat}&lng=${lon}&daily&current&api_key=J6QpZzELzq2OHVHrccFNFgm0eng4dRtV`
    const Response = await fetch(url1);
    const Data = await Response.json();
    const {meta : {error_type}, response : {data : {current}}, currentData} = Data
    if (error_type){
      callback("try another location!", undefined)
    } else{ 
       const CurrentFinal = current || currentData;
    callback(undefined, `It is currently ${CurrentFinal.temperature_2m} degrees out. There is a ${CurrentFinal.precipitation}% chance of rain. \n and of course i dont care about more information about weather application cause its just test project :) \n gl hf`);
    }
  } catch (error) {
    callback('net ghate: ', error.message, undefined);
  }
};

export{
    forecast
}