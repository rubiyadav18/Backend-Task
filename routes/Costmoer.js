const express = require("express");
const { AddCustomerDetails, SearchFirstNameLastNameCity, GetCustomerById, unique_cities, cities_with_customers_count } = require("../controller/Customers");
const router = express.Router();


router.post("/add-customer-details", AddCustomerDetails)
router.get("/Search-api", SearchFirstNameLastNameCity)
router.get("/Customerbyid/:customerId", GetCustomerById)
router.get("/Unique-City", unique_cities)
router.get("/citiescount",cities_with_customers_count)

module.exports = router;