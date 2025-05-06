const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

// Route imports
app.use('/users', require('./routes/users'));
app.use('/userphones', require('./routes/user_phone_numbers'));
app.use('/wallets', require('./routes/wallets'));
app.use('/wallettransactions', require('./routes/wallet_transactions'));
app.use('/payments', require('./routes/payments'));
app.use('/notifications', require('./routes/notifications'));
app.use('/reviews', require('./routes/reviews'));
//app.use('/reviewattachments', require('./routes/review_attachments'));
app.use('/items', require('./routes/items'));
app.use('/itemimages', require('./routes/item_images'));
app.use('/itemspecs', require('./routes/item_specifications'));
app.use('/categories', require('./routes/categories'));
app.use('/auctionmeta', require('./routes/auction_meta'));
app.use('/auctionsessions', require('./routes/auction_sessions'));
app.use('/itemauctions', require('./routes/item_auctions'));
app.use('/bids', require('./routes/bids'));
app.use('/transactions', require('./routes/transactions'));
app.use('/shipping', require('./routes/shipping'));

app.listen(port, () => {
  console.log(`Auction app backend running at http://localhost:${port}`);
});
