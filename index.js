const express = require('express');
const app = express();
const config = require('./config');
const mongoose = require('mongoose');


//mongoose
mongoose.connect(config.DBURI,() => console.log('database connected'));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//app routes
app.use('/users', require('./routes/api/users'));
app.use('/jobs', require('./routes/api/jobs'));
app.use('/companies', require('./routes/api/companies'));



app.listen(config.PORT, () => console.log('server is up'));


