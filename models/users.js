class User {
  constructor({ ID, FULLNAME, EMAIL, PASSWORDHASH, REGISTRATIONTIMESTAMP, ADDRESS,  LASTLOGINTIMESTAMP, ACCOUNTSTATUS }) {
    this.id = ID;
    this.fullName = FULLNAME;
    this.email = EMAIL;
    this.passwordHash = PASSWORDHASH;
    this.registrationTimestamp = REGISTRATIONTIMESTAMP;
    this.address = ADDRESS;
    this.lastLoginTimestamp = LASTLOGINTIMESTAMP;
    this.accountStatus = ACCOUNTSTATUS;
  }
}

module.exports = User;
