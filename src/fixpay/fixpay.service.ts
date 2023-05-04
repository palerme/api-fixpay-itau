import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { Body, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FixpayService {
  constructor(private readonly httpService: HttpService) {}

  async geraPix(@Body() body: object) {
    console.log(body);
    const pix = await lastValueFrom(
      this.httpService
        .post('https://pix.fixpay.com.br:3467/v1/generate_pix_per_day', body, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        })
        .pipe(
          catchError((e) => {
            console.log('erro', e.response?.data);
            throw new HttpException(
              e.response?.data?.error?.message,
              e.response?.status || 500,
            );
          }),
        ),
    );
    console.log(pix.data.data.pixCopiaECola);
    const txid = pix.data.data.txid;
    console.log(txid);
    return this.qrCode(txid);
  }

  async qrCode(txid: string) {
    const qrCode = await lastValueFrom(
      this.httpService.get(
        `https://pix.fixpay.com.br:3467/v1/consult_pix_qrcode/${txid}`,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        },
      ),
    ).then((response) => response.data);
    const imgBase64 = Buffer.from(qrCode.data.imagem_base64, 'base64');
    const base64data = imgBase64.toString('base64');
    if (!qrCode) return 'Sem chave';
    return this.consultaPix(txid), base64data;
  }

  async consultaPix(txid: string) {
    const pixConsulta = await lastValueFrom(
      this.httpService.get(
        `https://pix.fixpay.com.br:3467/v1/consult_pix/${txid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.TOKEN}`,
          },
        },
      ),
    ).then((response) => response.data);
    if (pixConsulta.data.status === 'CONCLUIDA') {
      return 'PIX PAGO COM SUCESSO!';
    } else if (pixConsulta.data.status === 'ATIVA') {
      return this.consultaPix(txid);
    }
    console.log('Consulta PIX', pixConsulta.data);
    return pixConsulta.data;
  }
}
