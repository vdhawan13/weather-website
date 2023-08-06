import http from 'http';
import fs from 'fs';
import requests from 'requests';

const home = fs.readFileSync('index.html', 'utf-8');
const replaceval=(tempVal, orgVal)=>{
    let temperature=tempVal.replace("{%temperature%}", orgVal.main.temp);
    temperature=temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature=temperature.replace("{%loc%}", orgVal.name);
    temperature=temperature.replace("{%country%}", orgVal.sys.country);
    temperature=temperature.replace("{%tempStatus%}", orgVal.weather[0].main);
    return temperature;
}

const server=http.createServer((req, res) => {
    if (req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?lat=30.451&lon=76.1624&appid=ec1558e4842edd090fd42393ddf6a2a8&units=metric')
            .on('data', (chunk)=> {
                const objdata=JSON.parse(chunk);
                const arrdata=[objdata];
                const realTimeData=arrdata.map((val)=>replaceval(home, val)).join("");
                res.write(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});

server.listen(8000, '127.0.0.1');