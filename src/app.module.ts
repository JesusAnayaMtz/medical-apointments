import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.development'],
    load: [typeOrmConfig],
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const typeOrmConfig = configService.get('typeorm');
      if (!typeOrmConfig) {
        throw new Error('TypeORM configuration not found');
      }
      return typeOrmConfig;
    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
