export interface EquipamentoDTO {
    idEquipamento?: number | undefined;
    idCliente?: number | undefined;
    tipo: string;
    marca: string;
    modelo: string;
}

export interface EquipamentoDTOApi extends EquipamentoDTO {
    id_equipamento?: number | undefined;
    id_cliente?: number | undefined;
}