const express = require('express');
const router = express.Router();

router.post('/fooditems', (req, res) => {
    try {
        res.send([global.FoodItems, global.foodCategory])
        console.log(global.FoodItems);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error occured");
    }
})
module.exports = router;
