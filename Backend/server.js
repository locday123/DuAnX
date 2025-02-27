const express = require('express');
const PORT = 8081;
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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
const ProductRoutes = require('./Routes/ProductRoutes')
const LoginRoutes = require('./Routes/LoginRoutes');
const LogoutRoutes = require('./Routes/LogoutRoutes');
const FileManagerRoutes = require('./Routes/FileManagerRoutes');
const { loadImages } = require('./Controller/FileManagerController');
app.get("/", (req, res)=>{
  res.json("Home")
})
app.use('/account', AccoutRoutes)
app.use('/category', CategoryRoutes)
app.use('/storage', StorageRoutes)
app.use('/product', ProductRoutes)
app.use('/login', LoginRoutes)
app.use('/logout', LogoutRoutes)
app.use("/file-manager", FileManagerRoutes)
app.use('/images', express.static(path.join(__dirname, 'public/')))
app.use('/img-product', express.static('public/product'));



app.listen(PORT, ()=>{
  console.log('listening')
});