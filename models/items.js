class Item {
  constructor({ ID, NAME, DESCRIPTION, CATEGORYID, SELLERID, BASEPRICE, LISTINGTIMESTAMP, RESERVEPRICE }) {
    this.id = ID;
    this.name = NAME;
    this.description = DESCRIPTION;
    this.categoryId = CATEGORYID;
    this.sellerId = SELLERID;
    this.basePrice = BASEPRICE;
    this.listingTimestamp = LISTINGTIMESTAMP;
    this.reservePrice = RESERVEPRICE;
  }
}

module.exports = Item;
