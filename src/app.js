const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vidix'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Vidix'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Here you can search for help',
        name: 'Vidix'
    });
});


app.get('/weather', (req, res) => {
   
   //const weatherUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Osijek.json?access_token=pk.eyJ1IjoiZGFtaXZpZGEiLCJhIjoiY2syYm1xbXByMnZmNjNsbXpyMmRqd2s5aCJ9.jpEngDvGQ42OGhptxkfqMQ&limit=1%27;";
   
   if(!req.query.address) {
       return res.send({
           error: 'You shold provide an address'
       });
   }
   
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {

     return  res.send({
            error: error
        });
    
        //return console.log(error);
    }
    
    forecast(latitude, longitude,(error, {forecastData}) => {
        if(error) {

          return  res.send({
                error: error
            });

           // return console.log(error)
        }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
    });
}) 



 /*    res.send({
        forcast: 'Sunny day',
        location: 'Osijek',
        address: req.query.address
    }); */
});


app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query.search);
    
    
    res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vidix',
        message: 'Help article not found',
       
    });
});



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vidix',
        message: 'Page not found',
       
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});








