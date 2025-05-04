class WalletTransaction {
    constructor({ ID, WALLETID, AMOUNT, TIMESTAMP, TYPE }) {
      this.id = ID;
      this.walletId = WALLETID;
      this.amount = AMOUNT;
      this.timestamp = TIMESTAMP;
      this.type = TYPE;
    }
  }
  
  module.exports = WalletTransaction;
  