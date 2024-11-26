import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors(
    // {
    // origin: (origin, callback) => {
    //   const allowedOrigins = [
    //     'http://localhost:5173',
    //   ];

    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, origin);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: ['content-type'],
    // credentials: true,
    // optionsSuccessStatus: 200
  // }
);

  await app.listen(3000);

}
bootstrap();
