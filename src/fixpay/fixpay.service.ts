import { HttpService } from '@nestjs/axios';
import { catchError, last, lastValueFrom } from 'rxjs';
import { Body, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FixpayService {
  constructor(private readonly httpService: HttpService) { }

  async geraPix(@Body() body: {}): Promise<any> {
    const pix = await lastValueFrom(
      this.httpService.post('https://pix.fixpay.com.br:3467/v1/generate_pix_per_day', body, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      }).pipe(
        catchError((e) => {
          console.log('erro', e.response?.data);
          throw new HttpException(
            e.response?.data?.error?.message,
            e.response?.status || 500,
          );
        })
      ))
    const { data } = pix.data
    return this.qrCode(data);
  }

  async qrCode(pix) {
    if(!pix) {
      return this.geraPix(pix)
    }
    const geraQRCode = await lastValueFrom(
      this.httpService.get(`https://pix.fixpay.com.br:3467/v1/consult_pix_qrcode/${pix.txid}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      }).pipe(
          catchError((e) => {
            console.log('erro', e.response?.data);
            throw new HttpException(
              e.response?.data?.error?.message,
              e.response?.status || 500,
            );
          })
        )
    )
    console.log(geraQRCode)
  }
}