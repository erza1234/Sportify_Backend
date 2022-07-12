const express = require('express');
const route = express.Router()

const billingController = require('../controllers/membershipBilling');
const membershipController = require('../controllers/membership');

// billing API
route.post('/api/membership/create-billing-info', billingController.createBillingInfo);
route.get('/api/membership/billing-info/:id', billingController.findBillingInfo);
route.put('/api/membership/update-billing-info/:id', billingController.updateBillingInfo);

// membership API
route.post('/api/membership/create-purchase', membershipController.createMembership);
route.get('/api/membership/purchase', membershipController.findMembership);
route.get('/api/membership/purchase/:id', membershipController.findMembership);
route.put('/api/membership/update-purchase/:id', membershipController.updateMembership);


module.exports = route;