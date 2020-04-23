'use strict';
const {MongoClient} = require("mongodb");

// exercise 2
const getSeats = async (req, res) => {
    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });
    
    await client.connect();
    console.log("connected!");

    const db = client.db("BookingContext");
    db.collection("seats")
        .find()
        .toArray((err, data) => {
            if (err) {
                res.status(400).json({nope: "nope!", error: err})
            }
            else {
                client.close();
                console.log("disconnect");
                let seats = {};
                data.forEach(datum => {
                    seats = {...seats, [datum._id]: datum}
                })
                res.status(200).json({seats: seats, numOfRows: 8, seatsPerRow: 12});
            }
        })
};

// exercise 3 + 4
const bookSeats = async (req, res, seatId, creditCard, expiration, fullName, email) => {
    if (!creditCard || !expiration) {
        return res.status(400).json({
            status: 400,
            message: 'Please provide credit card information!',
        });
    }
    const _id = seatId;
    const client = new MongoClient("mongodb://localhost:27017", {
        useUnifiedTopology: true,
    });

    await client.connect();
    console.log("connected");

    const db = client.db("BookingContext");
    const r = await db.collection("seats").updateOne({_id}, {$set: {isBooked: true, fullName: fullName, email: email}})
    res.status(200).json({ status: 200,success: true, });
}

module.exports = { getSeats, bookSeats };
