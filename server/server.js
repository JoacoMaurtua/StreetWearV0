require('dotenv').config();
const products = require('./data/products');

const express = require('express');

const app = express();

const PORT = process.env.PORT;
 

/* app.get('/',(req,res)=>{
  res.send('API is running...')
}); */


//Conexion con la base de datos:
const connectDB = require('./config/mongodb.config');
connectDB(); //-->Llama a la funcion asincrona


//Midlewares para realizar consulta POST
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Conectando con rutas:
app.use('/api', require('./routes/product.routes'));

app.use('/api', require('./routes/user.routes'));

app.use('/api', require('./routes/order.routes'));

app.get('/api/config/paypal', (req,res) => //PayPal
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.listen(PORT,()=>{
  console.log(`1: Servidor corriendo en ${process.env.NODE_ENV} en el puerto ${PORT}`)
});

/*
  PASOS PARA USAR PAYPAL:
  1) CREO UNA CUENTA DE INKASHOP EN SANDBOX
  2) ACCEDO AL ENDPOINT DESDE EL SERVER

*/