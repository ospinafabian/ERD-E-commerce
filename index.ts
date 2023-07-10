import express from 'express';
import mongoose from 'mongoose';

import { routerApi } from './src/controllers/routes';

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://admin:1234@ecommercebit.kozln12.mongodb.net/')
.then(()=> {
    console.log('conexion a mongo establecida');
})
.catch (() => {
    console.log('no se logro la conexion a Mongo');
});

routerApi(app);

app.listen(port, function () {
    console.log("the app is executing in: https://localhost:"+ port);
});



// let ProductsDB: Products[] = [
    // {
    //     name: "FAB pencil N2",
    //     image: "https://iheartcraftythings.com/wp-content/uploads/2021/05/Pencil-DRAWING-%E2%80%93-STEP-10.jpg",
    //     category: "office supplies",
    //     warranty: "11/01/2024",
    //     stock: 2549,
    //     sku: "784512"
    // },
    // {
    //     name: "summer soccer ball",
    //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSuBG9XjFZ1-dLm3AEKo-VTlS-8vBmXvOTXi0Id-AxWwG7h3oHJrvDsPOItD-tIhZBslI&usqp=CAU",
    //     category: "Sports & Outdoors",
    //     warranty: "07/09/2025",
    //     stock: 452,
    //     sku: "125689"
    // },
    // {
    //     name: "Moisturizer Cerave lotion",
    //     image: "https://m.media-amazon.com/images/I/610QMwEMmpL.__AC_SX300_SY300_QL70_ML2_.jpg",
    //     category: "Personal Care",
    //     warranty: "09/02/2024",
    //     stock: 5,
    //     sku: "963852",
    // }
// ];

// app.get('/products', function (request, response) {
//     response.json(ProductsDB);
// });

// app.get('/products/:sku', function (request, response) {
//     const sku = request.params.sku;
//     const result = ProductsDB.filter(item => item.sku === sku);
//     response.json(result);
// });

// app.post('/products', function(request,response){
//     const body = request.body;
//     ProductsDB.push(body);
//     response.send('the product has been saved');
// });

// app.put('/products/:sku', function(request,response){
//     const sku = request.params.sku;
//     const body = request.body;
//     const productIndex = ProductsDB.findIndex(item => item.sku === sku);
//     console.log("productIndex", productIndex);
//     ProductsDB[productIndex] = body;
//     response.send('The product has been updated')
// });

// app.delete('/products/:sku', function (request,response){
//     const sku = request.params.sku;
//     const result = ProductsDB.filter(item => item.sku != sku);
//     ProductsDB = result;
//     response.json("This product has been eliminated")
// })


