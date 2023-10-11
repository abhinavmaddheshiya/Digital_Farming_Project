import express from 'express'
import { getDB, getCrop } from './database.js'


const app = express()

app.use(express.json());
app.use(express.urlencoded());

app.use('/static', express.static('./public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/login', (request, response) => {
    response.render('login');
});

app.post('/login', async (request, response) => {
    const { N, P, K, T, H, pH, R } = request.body;
    if(N && P && K && T && H && pH && R){
        const note = await getCrop(N, P, K, T, H, pH, R)
        response.send(`<div style="font-size: 40px;">Your Soil is Suitable for - ${note.label}</div>`)
    }else{
        response.send(`<div style="font-size: 30px;">Input Data Missing</div>`);
    }
});

app.get('/', (request, response) => {
    response.send('Welcome to EXPRESS_MYSQL_QUERY_DB!');
});

app.get("/db", async (req, res) => {
    const notes = await getDB();
    res.send(notes)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke 💩')
})

app.listen(1010, () => {
    console.log('Server is running on port 1010')
})