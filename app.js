const express = require('express');
const app = express();
const fs = require('fs');

const Contenedor = require('./contenedor.js');


const PORT = process.env.PORT || 8080;

const Product = new Contenedor('./productos.json');
Product.leer();

app.get('/', (req, res) => {
    res.send(`
        <h1 style="color:gray;">Bienvenido a Express</h1>
        <h2 style="color:lightBlue;"> Desafio 3!</h2>`
    );
})

app.get('/productos', (req, res) => {
    const arrProductos = Product.getAll();
    arrProductos.then(productos => {
       const conteProductos = JSON.stringify(productos,null,2);
       res.type('json');
         res.send(conteProductos);
           
    });
    // res.send(`
    //     
    //     <ul>
    //         ${Product.productos.map(producto => `<li>${producto.title}</li>`)}
    //         </ul>`)
     });
    


app.get('/productoRamdon', (req, res) => {

    const productoRamdon = Math.floor(Math.random()* Product.productos.length);
    const producto = Product.getById(productoRamdon);
    producto.then(producto => {
        res.send(`
                  <h1 style="color:gray;">Producto Ramdon</h1>
                   <h2 style="color:lightBlue;"> Desafio 3!</h2>
                   <p style="color:gray;">${Product.productos[productoRamdon].title}</p>  `
                
                  );
    });

   
            
    // res.send(`
    
    //     
    //     <ul>
    //      ${Product.productos.map(producto => `<li>${producto.title}</li>`).sort(function(){return 0.5-Math.random()}).slice(0,1)}                             
    //    </ul>`);
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})