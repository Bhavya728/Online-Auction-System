class Category {
  constructor(row) {
    this.id = row[0];
    this.parentCategoryId = row[1];
    this.name = row[2];
    this.description = row[3];
    this.isActive = row[4];
  }
}

module.exports = Category;
