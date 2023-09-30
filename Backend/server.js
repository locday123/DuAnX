  const express = require('express');
  const PORT = 8081;
  const app = express();
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const path = require('path')
  
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
  const CategoryRoutes = require('./Routes/CategoryRoutes')
  const StorageRoutes = require('./Routes/StorageRoutes')
  const LoginRoutes = require('./Routes/LoginRoutes');
  const LogoutRoutes = require('./Routes/LogoutRoutes');

  app.get("/", (req, res)=>{
    res.json("Home")
  })
  app.use('/account', AccoutRoutes)
  app.use('/category', CategoryRoutes)
  app.use('/storage', StorageRoutes)
  app.use('/login', LoginRoutes)
  app.use('/logout',LogoutRoutes)
  app.use("/images", express.static('public/images'));


  app.listen(PORT, ()=>{
    console.log('listening')
  });