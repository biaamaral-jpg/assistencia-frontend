export interface AgendamentoDTO {
    idAgendamento?: number;
    idCliente: number;
    idEquipamento: number;
    dataHora: Date | string;
    status: 'Pendente' | 'Em andamento' | 'Concluído';
}