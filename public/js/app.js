//Client side javascript 



const fetchWeather = (url,callback) => {
    
    fetch(url).then((response)=> {
   response.json().then((data)=>{
       if(data.error)
       {
          msg1.textContent = 'Error Occured: '+ data.error
          msg2.textContent = ''
          callback('')
       }
       else
       {
                  
            callback(data)
       }
     
   })
})
}

const weatherForm = document.querySelector('form')
var msg1 = document.querySelector('#msg1')
var msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    let search = document.querySelector('input').value
    if(search === '')
    {
        msg1.textContent = 'Please enter a location to find the weather'
    }
    else
    {
        let url = '/weather?address=' + search
        msg1.textContent = 'Loading'
        msg2.textContent = ''
        var data = fetchWeather(url, (data)=>{
            if(!data=='')
            {
            msg1.textContent = data.name + ', ' + data.country
            msg2.textContent = data.temperature + ' Degrees Celcius'
            }
        })
    }
    
})

