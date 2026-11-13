import { API_URL } from '../config/api';
import type { AgendamentoDTO } from '../dto/AgendamentoDTO';

class AgendamentoRequests {
    private endpoints: string[];

    constructor() {
        this.endpoints = [
            `${API_URL}/api/agendamentos`,
            `${API_URL}/api/agendamento`,
            `${API_URL}/agendamentos`,
            `${API_URL}/agendamento`,
            `${API_URL}/api/agenda`,
            `${API_URL}/agenda`,
        ];
    }

    private async fetchComFallback<T>(
        method: string,
        body?: any,
        id?: number
    ): Promise<Response | null> {
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

    private normalizarAgendamento(agendamento: any): AgendamentoDTO {
        return {
            idAgendamento:
                agendamento.idAgendamento ??
                agendamento.id_agendamento ??
                agendamento.id ??
                0,
            idCliente: agendamento.idCliente ?? agendamento.id_cliente ?? 0,
            idEquipamento:
                agendamento.idEquipamento ??
                agendamento.id_equipamento ??
                0,
            dataHora:
                agendamento.dataHora ??
                agendamento.data_hora ??
                agendamento.data ??
                new Date().toISOString(),
            status: agendamento.status ?? 'Pendente',
        };
    }

    async criar(agendamento: AgendamentoDTO) {
        try {
            const response = await this.fetchComFallback('POST', agendamento);

            if (!response) {
                throw new Error('Não foi possível conectar ao backend de agendamentos.');
            }

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = 'Erro ao cadastrar agendamento.';

                if (corpo) {
                    try {
                        const dados = JSON.parse(corpo) as {
                            message?: string;
                            error?: string;
                            detail?: string;
                        };
                        mensagem = dados.message ?? dados.error ?? dados.detail ?? corpo;
                    } catch {
                        mensagem = corpo;
                    }
                }

                throw Object.assign(new Error(mensagem), { status: response.status });
            }

            return true;
        } catch (error) {
            console.error('Erro na requisição de cadastro de agendamento:', error);
            throw error;
        }
    }

    async listar() {
        try {
            const response = await this.fetchComFallback('GET');
            if (!response) return [];

            const dados = await response.json();
            return Array.isArray(dados)
                ? dados.map((agendamento: any) => this.normalizarAgendamento(agendamento))
                : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async obterAgendamentoPorId(id: number) {
        try {
            const response = await this.fetchComFallback('GET', undefined, id);
            if (!response) {
                throw new Error('Agendamento não encontrado.');
            }

            if (!response.ok) {
                throw new Error('Agendamento não encontrado.');
            }

            const dados = await response.json();
            return this.normalizarAgendamento(dados);
        } catch (error) {
            console.error('Erro ao buscar agendamento por ID:', error);
            throw error;
        }
    }
}

export default new AgendamentoRequests();
