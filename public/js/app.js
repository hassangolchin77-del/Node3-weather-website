
console.log("Client side javascript file is loaded!")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    massageOne.textContent = 'Loading...'
    massageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?search=${location}`).then((response) => {
     response.json().then((data = [])=>{
        if(data.error){
            // console.log(data.error)
            massageOne.textContent = data.error
        }
        else if(data.length === 0){
        //    return console.log("please provide another location!")
        massageOne.textContent = "please provide another location!"
        }else{
            const Data = {
            location: data.location,
            forcast: data.forcast
           }
           console.log(Data)
           massageOne.textContent = `location : ${Data.location}`
           massageTwo.textContent = Data.forcast
        //    massageTwo.textContent = `location: ${Data.location} \n ${Data.forcast}`
        }
    })
}).catch((error) => {
    console.log(error)
})
 
})












