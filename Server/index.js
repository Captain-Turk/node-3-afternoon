require('dotenv').config()
const express = require('express')
const massive = require('massive')

const productCtrl = require('./Controllers/productsController') 

const {SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

app.use(express.json())

app.get('/api/products', productCtrl.getAllProducts)
app.get('/api/products/:id', productCtrl.getOneProduct)
app.post('/api/products', productCtrl.createProduct)
app.put('/api/products/:id', productCtrl.updateProduct)
app.delete('/api/products/:id', productCtrl.deleteProduct)

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')    
}).catch(err=>console.log(err))

app.listen(SERVER_PORT, ()=> console.log(`Server listenting on port ${SERVER_PORT}`));



/*DON'T WRITE EVEN COMMENT TO PACKAGE.JSON NODEMON CRUSHES!!!
I TRIED TO TYPE A NOTE at first section related to NODE in main 'I specified Server folder but simply index.js(as default also working)'*/


