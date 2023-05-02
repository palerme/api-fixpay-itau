import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FixpayModule } from './fixpay/fixpay.module';

@Module({
  imports: [FixpayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
