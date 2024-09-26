const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://foodquest:Ankit%40565@foodquest.5dxmo.mongodb.net/FoodQuestMERN?retryWrites=true&w=majority&appName=FoodQuest';

const mongodb = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Access the FoodItems collection
        const foodItemsCollection = mongoose.connection.db.collection("FoodItems");
        const foodCategoryCollection = mongoose.connection.db.collection("FoodCategory");

        // Fetch FoodItems data
        const foodItemsData = await foodItemsCollection.find({}).toArray();
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();

        // Store data globally or export as needed
        global.FoodItems = foodItemsData;
        global.foodCategory = foodCategoryData;

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err.message);
    }
}

module.exports = mongodb;
