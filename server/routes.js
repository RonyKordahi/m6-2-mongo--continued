const router = require('express').Router();
const {getSeats, bookSeats} = require("./handlers");

router.get('/api/seat-availability', (req, res) => {
  return(getSeats(req, res));
});

router.post('/api/book-seat', async (req, res) => {
  const { seatId, creditCard, expiration, fullName, email } = req.body;
  bookSeats(req, res, seatId, creditCard, expiration, fullName, email)
});

module.exports = router;
