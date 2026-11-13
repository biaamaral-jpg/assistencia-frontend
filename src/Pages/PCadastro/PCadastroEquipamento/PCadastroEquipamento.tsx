import { useState, useEffect, type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import FormEquipamento from "../../../components/Formularios/FormEquipamento/FormEquipamento";
import { API_URL } from '../../../config/api';

// Interface para tipar os equipamentos listados
interface IEquipamento {
  idEquipamento?: number;
  idCliente?: number;
  tipo: string;
  marca: string;
  modelo: string;
}

function PCadastroEquipamento(): JSX.Element {
  const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);

  // Função para buscar a lista atualizada do backend
  const carregarEquipamentos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/api/equipamentos`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setEquipamentos(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar a lista de equipamentos:", error);
    }
  };

  // Carrega os equipamentos assim que a página abre
  useEffect(() => {
    carregarEquipamentos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      
      {/* Passamos a lista e a função de atualizar para o formulário/listagem */}
      <FormEquipamento 
        equipamentos={equipamentos} 
        onSuccess={carregarEquipamentos} 
      />
      
      <Rodape />
    </div>
  );
}

export default PCadastroEquipamento;