export interface Root {
    data: Data
}

export interface Data {
    calendario: Calendario
    status: string
    txid: string
    revisao: number
    loc: Loc
    location: string
    devedor: Devedor
    valor: Valor
    chave: string
    solicitacaoPagador: string
    pixCopiaECola: string
}

export interface Calendario {
    criacao: string
    expiracao: string
}

export interface Loc {
    id: string
    location: string
    tipoCob: string
    criacao: string
}

export interface Devedor {
    cnpj: string
    nome: string
}

export interface Valor {
    original: string
    modalidadeAlteracao: number
}
