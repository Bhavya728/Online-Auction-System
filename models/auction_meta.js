class AuctionMeta {
    constructor({ ITEMID, STARTTIMESTAMP, ENDTIMESTAMP, STARTPRICE, AUCTIONTYPE }) {
      this.itemId = ITEMID;
      this.startTimestamp = STARTTIMESTAMP;
      this.endTimestamp = ENDTIMESTAMP;
      this.startPrice = STARTPRICE;
      this.auctionType = AUCTIONTYPE;
      
    }
  }
  module.exports = AuctionMeta;