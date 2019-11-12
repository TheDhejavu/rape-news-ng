const express = require("express");
const bodyParser =  require("body-parser");
const cookieParser = require("cookie-parser");
const dotevn = require('dotenv').config();
const config = require("./config/environment");
const helmet = require('helmet');
const socket = require("socket.io");
const morgan = require('morgan');
const logger = require('./logger');
const cluster = require('express-cluster');
const passport = require("passport");
const apiRoutes = require("./api/routes");
const responses = require("./helpers/responses");
require('./config/mongoose');

class App{
    constructor(){
        this.app = express();
        this.host = config.host;
        this.port = config.port;

        this.configurations();

        this.serverRoutes();

        // this.serverSockets();
        this.execute();
    }
    configurations(){
        const urlencodedParser = bodyParser.urlencoded({ extended: true });
        const jsonParser = bodyParser.json();

        this.app.use(urlencodedParser);
        this.app.use(jsonParser);

        this.app.use(helmet());

        this.app.use(cookieParser());

        this.app.use(morgan('combined',  { stream: logger.stream }));

        //passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        //static files
        this.app.use(express.static("public"));

        // error handler
        this.app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

            res.serverError = responses.serverError

            logger.error(
                `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
            );

            if (process.env.NODE_ENV === 'development') {
                res.status( err.code || 500 )
                    .json({
                        status: 'error',
                        message: err
                    });
            }else{
                res.status(err.status || 500)
                    .json({
                        status: 'error',
                        message: err.message
                    });
            }
        });
    }
    serverRoutes(){
        //Server Api Routes..
        this.app.use("/api", apiRoutes);

        // catch 404 error
        this.app.use("*", function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;

            res.status(err.status || 500)
                    .json({
                        status: 'error',
                        message: err.message
                    });
        });
    }
   
    execute(){
        switch (process.env.NODE_ENV) {
            case 'production':

              // mount server cluster
            this.server = cluster((worker) => this.app.listen(this.port, this.host, () => {
                logger.info(`worker ${worker.id} online`);
            }));
            break;

            default:

              // mount server
              this.server = this.app.listen(this.port, this.host, () => {
                logger.info(`App running on http://${this.host}:${this.port}`);
            });
            break;
        }
        this.io = socket.listen(this.server);
    }
}

const AppServer = new App();
module.exports = {
    app: AppServer.app,
    server: AppServer.server
}