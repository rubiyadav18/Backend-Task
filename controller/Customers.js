const Customer = require("../models/customers")
const { validater } = require("../services/helper");


//AddCustomer APIS
const AddCustomerDetails = async (req, res) => {

    try {

        let search = validater(
            ["first_name", "last_name", "city", "company"], req.body
        );

if(search[0]==false)
    return res.status(404).json({ message: `${search[1]} Field Required`, data: [] })

        const {
            first_name,
            last_name,
            city,
            company
            
        } = req.body
        const newUser = new Customer({ first_name, last_name, city, company });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const SearchFirstNameLastNameCity = async (req, res) => {
    const { page = 1, limit = 10, first_name, last_name, city } = req.query;

    const query = {};

    if (first_name) {
        query.first_name = new RegExp(first_name, 'i');
    }

    if (last_name) {

        query.last_name = new RegExp(last_name, 'i');
    }

    if (city) {
        // Case-insensitive partial match for the city
        query.city = new RegExp(city, 'i');
    }

    try {
        const users = await Customer.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', error });
    }
};



//GetCustomers ById
const GetCustomerById = async (req,res) =>{
    try {
        const customer = await Customer.findById({ _id: req.params.customerId });

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found for this id' });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Something Went Wrong', error });
    }
}


//unique-cities api 
const unique_cities =  async (req, res) => {
    try {
        const uniqueCities = await Customer.distinct('city');

        res.status(201).json({ message: 'Unique City get successfully', city: uniqueCities });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


const cities_with_customers_count = async (req, res) => {
    try {
        const cityStats = await Customer.aggregate([
            {
                $group: {
                    _id: '$city',        // Group by city
                    count: { $sum: 1 },  // Count the number of customers in each city
                },
            },
        ]);

        res.status(201).json({ message: 'Unique City with count each city get successfully', city: cityStats });
        
    } catch (error) {
        res.status(500).json({ message: 'something went wrong', error });
    }
}


module.exports={
    AddCustomerDetails,
    SearchFirstNameLastNameCity,
    GetCustomerById,
    unique_cities,
    cities_with_customers_count
    

}