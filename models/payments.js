class Payment {
    constructor({ ID, USERID, AMOUNT, TIMESTAMP, TRANSACTIONREFERENCE,  REFUNDELIGIBLE }) {
      this.id = ID;
      this.userId = USERID;
      this.amount = AMOUNT;
      this.timestamp = TIMESTAMP;
      this.transactionReference = TRANSACTIONREFERENCE;
      this.refundEligible = REFUNDELIGIBLE;
    }
  }
  
  module.exports = Payment;
  