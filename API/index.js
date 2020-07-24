const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3008;
app.listen(PORT,()=> {
    console.log(`Server is at https:localhost:${PORT}`);
})
app.use(cors());
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());