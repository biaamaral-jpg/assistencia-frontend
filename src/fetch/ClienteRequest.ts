import { API_URL } from '../config/api';
import type { ClienteDTO } from '../dto/ClienteDTO';

class ClienteRequests {
    private endpoints: string[];

    constructor() {
        this.endpoints = [
            `${API_URL}/api/clientes`,
            `${API_URL}/api/cliente`,
            `${API_URL}/clientes`,
            `${API_URL}/cliente`,
        ];
    }

    private async fetchComFallback<T>(method: string, body?: any, id?: number): Promise<Response | null> {
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

    private normalizarCliente(cliente: any): ClienteDTO {
        return {
            idCliente: cliente.idCliente ?? cliente.id_cliente ?? cliente.id ?? undefined,
            nome: cliente.nome ?? '',
            email: cliente.email ?? undefined,
            endereco: cliente.endereco ?? cliente.enderecoCompleto ?? '',
            telefone: cliente.telefone ?? cliente.telefonePrincipal ?? '',
            cpf: cliente.cpf ?? undefined,
        };
    }

    async criar(cliente: ClienteDTO) {
        try {
            const response = await this.fetchComFallback('POST', cliente);

            if (!response) {
                throw new Error('Não foi possível conectar ao backend de clientes.');
            }

            if (!response.ok) {
                const corpo = await response.text();
                let mensagem = 'Erro ao cadastrar cliente.';

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
            console.error('Erro na requisição de cadastro de cliente:', error);
            throw error;
        }
    }

    async listar() {
        try {
            const response = await this.fetchComFallback('GET');
            if (!response) return [];

            const dados = await response.json();
            return Array.isArray(dados) ? dados.map((cliente: any) => this.normalizarCliente(cliente)) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async obterClientePorId(id: number) {
        try {
            const response = await this.fetchComFallback('GET', undefined, id);
            if (!response) {
                throw new Error('Cliente não encontrado.');
            }

            if (!response.ok) {
                throw new Error('Cliente não encontrado.');
            }

            const dados = await response.json();
            return this.normalizarCliente(dados);
        } catch (error) {
            console.error('Erro ao buscar cliente por ID:', error);
            throw error;
        }
    }
}

export default new ClienteRequests();