import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormAgendamento from "../../../components/Formularios/FormAgendamento/FormAgendamento";
import { API_URL } from '../../../config/api';

// Interface para tipar os produtos listados
interface IAgendamento {
  idAgendamento?: number;
  idCliente: number;
  idEquipamento: number;
  dataHora: Date | string;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
}

function PCadastroAgendamento(): JSX.Element {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarAgendamentos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/agendamentos`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setAgendamentos(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de agendamentos:", error);
    }
  };

  // Carrega os produtos assim que a página abre
  useEffect(() => {
    carregarAgendamentos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      
      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormAgendamento 
        agendamentos={agendamentos} 
        onSuccess={carregarAgendamentos} 
      />
      
      <Rodape />
    </div>
  );
}

export default PCadastroAgendamento;