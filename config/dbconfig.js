var dbConfig =  {
  mongodb: {
    test: {
      url: "mongodb://localhost/euquerominhabiblioteca_test"
    },
    development: {
      url: "mongodb://localhost/euquerominhabiblioteca_development",
    },
    production: {
      url: process.env.MONGOHQ_URL
    }
  },
  getDB: function(key) {
    return this[key][process.env.NODE_ENV || "development"]
  },
  getDBURL: function(key) {
    return this.getDB(key)['url']
  }
}

module.exports = dbConfig