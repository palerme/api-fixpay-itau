import { Module } from '@nestjs/common';
import { ItauBoletoService } from './itau-boleto.service';
import { ItauBoletoController } from './itau-boleto.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, AuthModule],
  controllers: [ItauBoletoController],
  providers: [ItauBoletoService, AuthService],
})
export class ItauBoletoModule {}
