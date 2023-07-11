import express from 'express';

import productsControllers from './products.controller';
import reviewsControllers from './reviews.controller';
import clientsControllers from './clients.controller';
import purchaseOrderControllers from './purchaseOrder.controller';
import billingControllers from './billing.controller';
import shippingControllers from './shipping.controller';





function routerApi(app: express.Application){
    app.use('/products', productsControllers);
    app.use('/reviews', reviewsControllers);
    app.use('/clients', clientsControllers);
    app.use('/purchaseorder', purchaseOrderControllers);
    app.use('/billing', billingControllers);
    app.use('/shipping', shippingControllers);


}

export { routerApi };