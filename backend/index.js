const express = require('express');
const app = express();
const cors = require('cors'); 
const dotenv = require('dotenv');  

dotenv.config();

app.use(cors());
app.use(express.json());

 
 
 
app.listen(8800, () => {
    console.log('Backend server is running!');
});