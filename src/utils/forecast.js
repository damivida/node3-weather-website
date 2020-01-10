const request =  require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b5d2d90d62e535926b2fce731ae6f9e4/${latitude},${longitude}?units=si&lang=en`;

    request({url,json:true}, (error, {body}) => {

        if(error) {
            callback('Unable to connect to the service', undefined);
        }else if(body.error) {
            callback('Unable to find location', undefined);
        }else {
            callback(undefined, {

                forecastData: `${body.daily.data[0].summary}The temperature is ${body.currently.temperature} and there is ${ body.currently.precipProbability} chance of rain.`

                /* curTemp: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                daySum: body.daily.data[0].summary, */
            });
        }
    });
}

module.exports = forecast;