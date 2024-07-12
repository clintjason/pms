const {Sequelize}  = require("sequelize");
const dbConfig = require("../config");
const fs = require('fs');
const path = require('path');
const envPath = path.resolve(__dirname, '../.env'); // Specify the path to your .env file
require('dotenv').config({path: envPath});
const basename = path.basename(__filename);
const db = {}

console.log('[+] Loading database config...')

let connection;
if (process.env.NODE_ENV === 'production') {
  console.log(`[+] Prodution - Using database: ${process.env.PROD_DB_DATABASE}`)
  //sequelize = new Sequelize(process.env.DATABASE_URL, config.production);
  connection = new Sequelize(dbConfig.production.DB, dbConfig.production.USER, dbConfig.production.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.production.dialect,
  
    pool: {
      max: dbConfig.production.pool.max,
      min: dbConfig.production.pool.min,
      acquire: dbConfig.production.pool.acquire,
      idle: dbConfig.production.pool.idle
    }
  });
} else if (process.env.NODE_ENV === 'development') {
  console.log(`[+] Development - Using database: ${process.env.DEV_DB_DATABASE}`);
  connection = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    port: '3306',
    dialect: dbConfig.development.dialect,
    dialectOptions: {
      connectTimeout: 80000 // Increase timeout to 60 seconds (in milliseconds)
    },
    pool: {
      max: dbConfig.development.pool.max,
      min: dbConfig.development.pool.min,
      acquire: dbConfig.development.pool.acquire,
      idle: dbConfig.development.pool.idle
    }
  });
} else if (process.env.NODE_ENV === 'test') {
  console.log(`[+] Using database: ${process.env.TEST_DB_DATABASE}`);
  connection = new Sequelize(dbConfig.testing.database, dbConfig.testing.username, dbConfig.testing.password, dbConfig.testing);
} else {
  console.log(`[-] CANNOT LOAD DATABASE FROM ENV: ${process.env.NODE_ENV}`)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(connection, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Adding schemas to Swagger documentation
const swaggerComponents = {
  components: {
    schemas: {}
  }
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  const properties = {};
  Object.keys(model.rawAttributes).forEach(attribute => {
    const attr = model.rawAttributes[attribute];
    properties[attribute] = {
      type: attr.type.constructor.key.toLowerCase(),
      description: attr.comment || ''
    };
  });
  swaggerComponents.components.schemas[modelName] = {
    type: 'object',
    properties
  };
});


db.Sequelize = Sequelize;
db.connection = connection;
db.swaggerComponents = swaggerComponents;

module.exports = db;