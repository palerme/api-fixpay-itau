import { AuthService } from './../auth/auth.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ItauBoletoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly geraToken: AuthService,
  ) { }

  async geraBoleto() {
    const token = await this.geraToken.itauToken();
    const body = [
      {
        "id_boleto": "b1ff5cc0-8a9c-497e-b983-738904c23386",
        "etapa_processo_boleto": "validacao",
        "codigo_canal_operacao": "BKL",
        "beneficiario": {
          "id_beneficiario": "150000052061",
          "nome_cobranca": "Antonio Coutinho SA",
          "tipo_pessoa": {},
          "endereco": {}
        },
        "dado_boleto": {
          "descricao_instrumento_cobranca": "boleto",
          "tipo_boleto": "proposta",
          "forma_envio": "impressão",
          "quantidade_parcelas": 2,
          "protesto": {},
          "negativacao": {},
          "instrucao_cobranca": [],
          "pagador": {},
          "sacador_avalista": {},
          "codigo_carteira": "112",
          "codigo_tipo_vencimento": 1,
          "valor_total_titulo": "180.00",
          "dados_individuais_boleto": [],
          "codigo_especie": "01",
          "descricao_especie": "BDP Boleto proposta",
          "codigo_aceite": "S",
          "data_emissao": "2000-01-01T00:00:00.000Z",
          "pagamento_parcial": true,
          "quantidade_maximo_parcial": 2,
          "valor_abatimento": "100.00",
          "juros": {},
          "multa": {},
          "desconto": {},
          "mensagens_cobranca": [],
          "recebimento_divergente": {},
          "desconto_expresso": true,
          "texto_uso_beneficiario": "726351275ABC",
          "pagamentos_cobranca": [],
          "historico": [],
          "baixa": {}
        },
        "acoes_permitidas": {
          "emitir_segunda_via": true,
          "comandar_instrucao_alterar_dados_cobranca": true
        }
      }
    ]
    const boleto = await firstValueFrom(
      this.httpService.post('https://devportal.itau.com.br/sandboxapi/itau-ep9-gtw-cash-management-ext-v2/v2/boletos', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-itau-key': process.env.CLIENT_ID,
          'x-sandbox-token': token
        },
      }
      )
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
    console.log(boleto.data);
    return JSON.stringify(boleto.data)
  }
}
