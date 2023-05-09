import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async itauToken(): Promise<string> {
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };
    const getToken = await firstValueFrom(
      this.httpService
        .post('https://devportal.itau.com.br/api/jwt', body, {
          headers: {
            'Content-Type': 'application/json',
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
    const accessToken = (await getToken).data.access_token;
    return accessToken;
  }
}
