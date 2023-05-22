const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
})();

//+------------------------------------------------------------------+
//| Defining a Schema. Blueprint for data.                               |
//+------------------------------------------------------------------+
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

//+------------------------------------------------------------------+
//| Defining a Model(Collection/Table) for this schema.              |
//+------------------------------------------------------------------+
const Fruit = mongoose.model("Fruit", fruitSchema);

//+------------------------------------------------------------------+
//| Create a document(Row in a Collection/Table).                    |
//+------------------------------------------------------------------+
const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'An apple a day keeps the doctor away.'
});

fruit.save(); //Save the fruit document in the Fruit collection of the fruitsDB database.

//+------------------------------------------------------------------+
//| Step 1: Define a Schema.                                         |
//+------------------------------------------------------------------+
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

//+------------------------------------------------------------------+
//| Step 2: Define a Collection based on the Schema.                 |
//+------------------------------------------------------------------+
const Person = mongoose.model('Person', personSchema);

//+------------------------------------------------------------------+
//| Step 3: Create a Document in the Collection.                     |
//+------------------------------------------------------------------+
const person = new Person({
    name: 'John',
    age: 37,
});

//+------------------------------------------------------------------+
//| Step 4: Save this Document to the Database.                      |
//+------------------------------------------------------------------+
person.save();

//---Create more Documents for the Fruit collection.
const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 1,
    review: 'Never had one.',
});

const orange = new Fruit({
    name: 'Orange',
    rating: 8,
    review: 'Healthy',
});

const banana = new Fruit({
    name: 'Banana',
    rating: 9,
    review: 'Great snack',
});

//---Insert several Documents into a Collection.
// Fruit.insertMany([kiwi,orange,banana], {ordered: false})
//     .then(() => {
//         console.log('All documents successfully inserted in fruitsDB');
//     })
//     .catch((error) => {
//         console.error(error);
//     });

//+------------------------------------------------------------------+
//| Reading from Database                                            |
//+------------------------------------------------------------------+
let fruits = [];
//---Find all documents
(async () => {
    try {
        fruits = await Fruit.find({});
        console.log('Success all Documents in Fruit collection found');
        console.log(fruits);
        //---Data manipulation.
        fruits.forEach((fruit) => {
            console.log(fruit.name);
        });
    } catch (error) {
        console.error('Query error:', error);
    }
    mongoose.connection.close();
})();



