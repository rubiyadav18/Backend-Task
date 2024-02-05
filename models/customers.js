// models/customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    city: String,
    company: String,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
