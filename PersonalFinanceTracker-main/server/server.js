const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const financialRecordRoute=require('./routes/financial-records')
const cors=require('cors');



dotenv.config();

const app = express();

app.use(cors());

app.use(express.json())

app.use('/financial-records',financialRecordRoute)

app.get('/', (req, res) => {
    res.send('Welcome to the Backend');
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Successful");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
}

main();



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
