import express from 'express';

import productsControllers from './products.controller';
import reviewsControllers from './reviews.controller';
import clientsControllers from './clients.controller';



function routerApi(app: express.Application){
    app.use('/products', productsControllers);
    app.use('/reviews', reviewsControllers);
    app.use('/clients', clientsControllers)
}

export { routerApi };