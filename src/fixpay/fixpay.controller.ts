import { Body, Controller, Get, Post } from '@nestjs/common';
import { FixpayService } from './fixpay.service';

@Controller('')
export class FixpayController {
  constructor(private readonly fixpayService: FixpayService) {}

  @Get('pix')
  async generateGet(@Body() body) {
    return this.fixpayService.geraPix(body);
  }
}
