import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import AuthRouter from './routes/AuthRouter'
import HeroRouter from './routes/HeroRouter'

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;
  
  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.set('views', 'D:/project/github/nodejs-auth-ts/views');
    this.express.engine('html', require('ejs').renderFile);
    this.express.set('view engine','ejs');
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World! and nodemon'
      });
    });

/*
    let logInRouter = express.Router();
    logInRouter.get('/', (req, res, next) => {
      res.render('login.html');
    });

*/
    this.express.use('/', router);
    this.express.use('/login', AuthRouter);
    this.express.use('/api/v1/heroes', HeroRouter);
  }
}

export default new App().express;