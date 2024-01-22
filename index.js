const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const dbRoutes = require("./dbHandler")
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(dbRoutes);


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})
const pass = "LU02D4EANxSIvnOJ"