const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/backend',
    saltFactor: 10
  },
  jwtExpiry: '1h',
  userRole: {
    companyAdmin: 'companyAdmin',
    companyRep: 'companyRep',
    consumer: 'consumer'
  }
};

module.exports = config;
