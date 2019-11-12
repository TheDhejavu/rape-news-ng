require('dotenv').config();

const config = {
    "development":{
        port:  process.env.APP_PORT || 6060,
        host: process.env.APP_HOST,
        db:"mongodb://localhost:27017/media-rape-data",
        session:{
            secret: process.env.EXPRESS_SESSION_SECRET
        }
    },
    "production":{
        port:  80,
        host: process.env.APP_HOST,
        db:"mongodb://localhost:27017/media-rape-data",
        session:{
            secret: process.env.EXPRESS_SESSION_SECRET
        }
    },
    "test": {
        port:  process.env.APP_PORT || 6060,
        host: process.env.APP_HOST,
        db: 'mongodb://localhost:27017/media-rape-data',
      },
}


module.exports = config[process.env.NODE_ENV || 'development'];