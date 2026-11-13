import { API_URL } from '../config/api';
import type { EquipamentoDTO } from '../dto/EquipamentoDTO';

class EquipamentoRequests {
    private endpoints: string[];

    constructor() {
        this.endpoints = [
            `${API_URL}/api/equipamentos`,
            `${API_URL}/api/equipamento`,
            `${API_URL}/equipamentos`,
            `${API_URL}/equipamento`,
        ];
    }

    private async fetchComFallback(method: string, body?: any, id?: number): Promise<Response | null> {
        let ultimoErro: any = null;

        for (const endpoint of this.endpoints) {
            const url = id !== undefined ? `${endpoint}/${id}` : endpoint;

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
                });

                if (response.status !== 404) {
                    return response;
                }

                ultimoErro = new Error(`Rota não encontrada em ${url}`);
            } catch (error) {
                ultimoErro = error;
            }
        }

        if (ultimoErro) {
            throw ultimoErro;
        }

        return null;
    }

    private normalizarEquipamento(equipamento: any): EquipamentoDTO {
        return {
            idEquipamento: equipamento.idEquipamento ?? equipamento.id_equipamento ?? equipamento.id ?? undefined,
            idCliente: equipamento.idCliente ?? equipamento.id_cliente ?? undefined,
            tipo: equipamento.tipo ?? '',
            marca: equipamento.marca ?? '',
            modelo: equipamento.modelo ?? '',
        };
    }

    async criar(equipamento: EquipamentoDTO) {
        try {
            const response = await this.fetchComFallback('POST', equipamento);

            if (!response) {
                throw new Error('Não foi possível conectar ao backend de equipamentos.');
            }

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = 'Erro ao cadastrar equipamento.';

                if (corpo) {
                    try {
                        const dados = JSON.parse(corpo) as { message?: string; error?: string; detail?: string };
                        mensagem = dados.message ?? dados.error ?? dados.detail ?? corpo;
                    } catch {
                        mensagem = corpo;
                    }
                }

                throw Object.assign(new Error(mensagem), { status: response.status });
            }

            return true;
        } catch (error) {
            console.error('Erro na requisição de cadastro de equipamento:', error);
            throw error;
        }
    }

    async listar() {
        try {
            const response = await this.fetchComFallback('GET');
            if (!response) return [];

            const dados = await response.json();
            return Array.isArray(dados) ? dados.map((equipamento: any) => this.normalizarEquipamento(equipamento)) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async obterEquipamentoPorId(id: number) {
        try {
            const response = await this.fetchComFallback('GET', undefined, id);
            if (!response) {
                throw new Error('Equipamento não encontrado.');
            }

            if (!response.ok) {
                throw new Error('Equipamento não encontrado.');
            }

            const dados = await response.json();
            return this.normalizarEquipamento(dados);
        } catch (error) {
            console.error('Erro ao buscar equipamento por ID:', error);
            throw error;
        }
    }
}

export default new EquipamentoRequests();