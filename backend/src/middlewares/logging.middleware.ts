import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // This middleware logs the HTTP request method and URL along with the current timestamp
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Calls the next middleware function in the stack
    next();
  }
}
