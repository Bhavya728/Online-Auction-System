class Transaction {
    constructor({ ID, BUYERID, AUCTIONID, AMOUNT, TRANSACTIONTIMESTAMP, TRANSACTIONFEE, CURRENCY }) {
      this.id = ID;
      this.buyerId = BUYERID;
      this.auctionId = AUCTIONID;
      this.amount = AMOUNT;
      this.transactionTimestamp = TRANSACTIONTIMESTAMP;
      this.transactionFee = TRANSACTIONFEE;
      this.currency = CURRENCY;
    }
  }
  module.exports = Transaction;