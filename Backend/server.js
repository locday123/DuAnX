  const express = require('express');
  const PORT = 8081;
  const app = express();
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  const bodyParser = require('body-parser');
  
  app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST, GET, DELETE, PUT'],
    credentials: true
  }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  const AccoutRoutes = require('./Routes/AccountRoutes')
  const LoginRoutes = require('./Routes/LoginRoutes');
  const LogoutRoutes = require('./Routes/LogoutRoutes');

  app.get("/", (req, res)=>{
    res.json("Home")
  })
  app.use('/account', AccoutRoutes)
  app.use('/login', LoginRoutes)
  app.use('/logout',LogoutRoutes)


  app.listen(PORT, ()=>{
    console.log('listening')
  });