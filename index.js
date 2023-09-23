require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Category = require('./Category')
const corsOptions = {
  origin: process.env.FRONT_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => console.log(e));

app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server connected");
});

const Grocery = require('./Grocery')
app.post('/AddGrocery', async(req,res)=>{
  try{
  

  const { category,name,
  price,
  area,
  priceInQuintal,
  priceInKg,
  contactNumber} = req.body;

  
  const newGrocery = new Grocery({
    category,
    name,
    price,
    area,
    priceInQuintal,
    priceInKg,
    contactNumber
  });

  await newGrocery.save();
  res.status(201).json({ message: 'Category added successfully' });

} catch (error) {
  console.error('Error adding category:', error);
  res.status(500).json({ error: 'An error occurred' });
}
});


// Create a function to get the unique categories
app.get('/getCategories', async (req, res) => {
  try {
    const categories = await Category.distinct('category');
    console.log(categories)
    res.json(categories); // Send the categories as a JSON response
  } catch (error) {
    console.error('Error fetching category list:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and send an error response
  }
});
 
app.get('/getCategories/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const groceries = await Grocery.find({ category }); 
    console.log(groceries)
    res.json(groceries); // Send the data as a JSON response
  } catch (error) {
    console.error('Error fetching data by category:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Handle errors and send an error response
  }
});
app.post('/addCategory',async (req,res)=>{
  const { category } = req.body;
  try {
    
    const newCategory = new Category({
      category
    })

  await newCategory.save();
  res.status(201).json({ message: 'Category added successfully' });

} catch (error) {
  console.error('Error adding category:', error);
  res.status(500).json({ error: 'An error occurred' });
}
});