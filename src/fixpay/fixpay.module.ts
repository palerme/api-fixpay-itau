import { Module } from '@nestjs/common';
import { FixpayService } from './fixpay.service';
import { FixpayController } from './fixpay.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 500,
      maxRedirects: 5,
    }),
  ],
  controllers: [FixpayController],
  providers: [FixpayService],
})
export class FixpayModule {}
