import path from "path"
import express from "express"
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import hbs from "hbs"
import { geocoding } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('views', viewPath); // in mige ye file bia aghab bad boro to view chon dare toye src donbale index.hbs migarde 
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: "weather",
        name: "hassan golchin"
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: "About me",
        name: "hassan golchin"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "You can contact us!",
        name: "hassan golchin"
    })
})

app.get('/weather', (req, res) => {
if(!req.query.search){
    return res.send({
        error: "You must provide a search term."
    })
}

if(!req.query.search){
     return res.send({
        error: "please provide address!"
     })
}else{
  geocoding(req.query.search, (error, {lat, lon, location} = {})=>{
  if(error){
    return res.send({
        error: error
    })
  }
   forecast(lat, lon, (error, forecastdata)=>{
    if(error){
    return res.send({
        error: error
    })
    }
    res.send({
        location: location,
        forcast: forecastdata,
        address: req.query.search
    })
  })
})
}

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term!"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/{*path}', (req, res) => {
    res.render('notFound',{
        title : "404",
        name: "hassan golchin",
        errorMassage: " Help article not found!"
    })
})

app.get('/{*path}', (req, res) => {
    res.render('notFound',{
        title : "404",
        name: "hassan golchin",
        errorMassage : "Page not found!"
    })
})

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0' , () => {
    console.log(`Server is up on port ${port}`)
})