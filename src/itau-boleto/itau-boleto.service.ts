import { AuthService } from './../auth/auth.service';
import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ItauBoletoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly geraToken: AuthService,
  ) {}

  async geraBoleto(@Body() body: string, token: string) {
    token = await this.geraToken.itauToken();

    const boleto = await firstValueFrom(
      this.httpService.post('www.google.com.br', null, {
        headers: {
          'Content-Type': 'application/json',
          'x-sandbox-token': `${token}`,
        },
      }),
    );
  }
}
