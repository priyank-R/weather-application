const path = require('path')
const forecast = require('./forecast')
const geocode = require('./geocode')


//Step 1: Requiring the Express JS dependency in the script 

const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

//Step 2: Using the express method and assigning its return value to app

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsDirectory)

app.set('view engine','hbs')    //defining the default views engine
app.set('views',viewsDirectory) //defining the default views directory


app.use(express.static(publicDirectoryPath))    //static content directory

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: 'By Priyank'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help Page',
        name: 'Priyank',
        instructions: "Please make sure that you refer the entire documentation before sending inquiry"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Priyank',
        instructions: "Please make sure that you refer the entire documentation before sending inquiry"
    })
})


//Using app to process further requests from the client 

app.get('/weather',(req,res)=>{
if(!req.query.address)
{
    return res.send({error: 'Provide an address to find the weather'})
}
else
{
    geocode(req.query.address,(error, response)=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(response.latitude, response.longitude, (error, response)=>{
            if(error)
            {
                return res.send({error})
            }
           
            return res.send(response)

        })
    })
}

    
})

app.get('/help/*', (req,res)=>{
    res.render('404-help')
})

app.get('*',(req,res)=>{
    res.render('404')
})

//Using app.listen() to initiate the server 

app.listen(port,()=>{
    console.log('Server is up on the port ' + port)
})
