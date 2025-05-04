class Shipping {
    constructor({ ID, TRANSACTIONID, ADDRESS, TRACKINGNUMBER, DELIVERYTIMESTAMP, COST, CARRIER, INSURANCE }) {
      this.id = ID;
      this.transactionId = TRANSACTIONID;
      this.address = ADDRESS;
      this.trackingNumber = TRACKINGNUMBER;
      this.deliveryTimestamp = DELIVERYTIMESTAMP;
      this.cost = COST;
      this.carrier = CARRIER;
      this.insurance = INSURANCE;
    }
  }
  module.exports = Shipping;