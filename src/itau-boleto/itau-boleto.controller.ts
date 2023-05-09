import { Body, Controller, Get } from '@nestjs/common';
import { ItauBoletoService } from './itau-boleto.service';

@Controller('itau-boleto')
export class ItauBoletoController {
  constructor(private readonly itauBoletoService: ItauBoletoService) {}

  @Get('boleto')
  async geraBoleto(@Body() body: string) {
    return this.itauBoletoService.geraBoleto();
  }
}
