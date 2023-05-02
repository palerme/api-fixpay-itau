import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FixpayService {
  constructor(private readonly httpService: HttpService) {}

  async geraPix() {
    const token = '8e543383f7995820b9de07b98d2c5122'
    const body = {
      value: 32.99,
      message: 'Venda de Livros!',
    };
    const pix = await lastValueFrom(
      this.httpService
        .post('https://pix.fixpay.com.br:3467/v1/generate_pix_per_day', body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError((e) => {
            throw new HttpException(
              e.response?.data?.error?.message,
              e.response?.status || 500,
            );
          }),
        ),
    );
    return JSON.stringify(pix);
  }
}
