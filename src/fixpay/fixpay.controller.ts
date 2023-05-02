import { Controller, Get } from '@nestjs/common';
import { FixpayService } from './fixpay.service';

@Controller('')
export class FixpayController {
  constructor(private readonly fixpayService: FixpayService) {}

  @Get('pix')
  async generateGet() {
    return this.fixpayService.geraPix();
  }
}
