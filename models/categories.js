class Category {
    constructor({ ID, PARENTCATEGORYID, NAME, DESCRIPTION,  ISACTIVE }) {
      this.id = ID;
      this.parentCategoryId = PARENTCATEGORYID;
      this.name = NAME;
      this.description = DESCRIPTION;
      this.isActive = ISACTIVE;
    }
  }
  
  module.exports = Category;
  