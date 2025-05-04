class Wallet {
    constructor({ ID, USERID, BALANCE, LASTUPDATED, CURRENCY, FREEZESTATUS }) {
      this.id = ID;
      this.userId = USERID;
      this.balance = BALANCE;
      this.lastUpdated = LASTUPDATED;
      this.currency = CURRENCY;
      this.freezeStatus = FREEZESTATUS;
    }
  }
  
  module.exports = Wallet;
  