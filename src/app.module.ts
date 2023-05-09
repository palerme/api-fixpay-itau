import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FixpayModule } from './fixpay/fixpay.module';
import { ConfigModule } from '@nestjs/config';
import { ItauBoletoModule } from './itau-boleto/itau-boleto.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/database.config';

@Module({
  imports: [
    FixpayModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ItauBoletoModule,
    HttpModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
