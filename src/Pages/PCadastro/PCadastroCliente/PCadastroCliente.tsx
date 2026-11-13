import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormCliente from "../../../components/Formularios/FormCliente/FormCliente";
import { API_URL } from '../../../config/api';

// Interface para tipar os clientes
interface ICliente {
  idCliente?: number;
  nome: string;
  email?: string;
  endereco: string;
  telefone: string;
  cpf?: string;
}

function PCadastroCliente(): JSX.Element {
  const [clientes, setClientes] = useState<ICliente[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarClientes = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/clientes`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setClientes(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de clientes:", error);
    }
  };

  // Carrega os clientes assim que a página abre
  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />

      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormCliente
        clientes={clientes}
        onSuccess={carregarClientes}
      />

      <Rodape />
    </div>
  );
}

export default PCadastroCliente;