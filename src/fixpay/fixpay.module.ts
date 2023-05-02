import { Module } from '@nestjs/common';
import { config } from 'dotenv'
import { FixpayService } from './fixpay.service';
import { FixpayController } from './fixpay.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [FixpayController],
  providers: [FixpayService],
})
export class FixpayModule {}
