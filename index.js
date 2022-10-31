const axios = require('axios')
const express = require('express');
const app = express()
const fs = require('fs')
const fetch = require("node-fetch")

app.use(express.json())

app.post('/login', async(req, res) => {
    const {email, password} = req.body

    const response = await axios.default.post('https://m.facebook.com/login.php', {
        email,
        password
    }, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:39.0) Gecko/20100101 Firefox/39.0' 
        }
    })

    return res.send(response.data)
});


app.get('/video', async (req, res) => {
    const response= await axios.get('https://www.facebook.com/groups/613096006498782/posts/776263663515348/', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.47 Safari/537.36'
        }
    })

    return res.send(response.data)
})

app.get('/pagina', async (req, res) => {
    const url = "https://m.facebook.com/rodrigo.fagundes.714/videos/750071046247612"
    const response1 = await axios.default.get(url)

    const permaLink = response1.data.split(';href=', )[1].split('" />')[0].replace('m.', 'www.')

    const response2 = await axios.default.get(permaLink, {
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-mode': 'navigate',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54'
        }
    })

    const formats = response2.data.slice(365000, 380000);
    const qualities = formats.match(/\W*(FBQualityLabel=\\")([0-9])*p/g).join('').match(/([0-9])*p/g);


    const urls = formats.match(/\W*(BaseURL>([^])+)(BaseURL>)/g)

    console.log(urls.length)
    return res.send(urls);
    // const urlVideo = urls.map((e, i) => {
    //     return {
    //         // size: ''
    //         qualidade: qualities[i] || 'Audio',
    //         url: e.replace(/amp;*/g, '')
    //     }
    // })

    
    // return res.send(urlVideo)
})

app.listen(3030, ()=> console.log('Facebook...'))
