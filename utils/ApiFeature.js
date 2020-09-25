class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  sort() {
    if (this.queryString.sort) {
      this.query.sort(this.queryString.sort)
    }
    return this
  }
}

module.exports = APIFeatures
