class Bid {
    constructor({ ID, USERID, AUCTIONID, AMOUNT, TIMESTAMP }) {
      this.id = ID;
      this.userId = USERID;
      this.auctionId = AUCTIONID;
      this.amount = AMOUNT;
      this.timestamp = TIMESTAMP;

    }
  }
  module.exports = Bid;