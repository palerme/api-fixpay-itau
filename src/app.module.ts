import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FixpayModule } from './fixpay/fixpay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FixpayModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
