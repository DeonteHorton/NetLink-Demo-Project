const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./app/routes/router');

const PORT = 3008;

 app.listen(PORT,()=>{
    console.log(`Server at http://localhost:${PORT}`);
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({
        "All accounts":"https://localhost:3008/api/accounts",
        "All blog post":"https://localhost:3008/api/blogs"
    })
});

app.post('/post',(req,res)=>{
    console.log(req.body);
    res.json(req.body)
})

app.use('/api',router)