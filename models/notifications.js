class Notification {
    constructor({ ID, USERID, MESSAGE, TIMESTAMP, ISREAD }) {
      this.id = ID;
      this.userId = USERID;
      this.message = MESSAGE;
      this.timestamp = TIMESTAMP;
      this.isRead = ISREAD;
      
    }
  }
  
  module.exports = Notification;
  