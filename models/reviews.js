class Review {
    constructor({ ID, USERID, ITEMID, RATING,  TIMESTAMP }) {
      this.id = ID;
      this.userId = USERID;
      this.itemId = ITEMID;
      this.rating = RATING;
      this.timestamp = TIMESTAMP;
    }
  }
  
  module.exports = Review;
  