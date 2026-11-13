import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesAgendamento from "../../../components/Listagens/DetalhesAgendamento/DetalhesAgendamento";
import Rodape from "../../../components/Rodape/Rodape";

function PDetalhesAgendamentoPage(): JSX.Element {
  const { id_agendamento } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      <DetalhesAgendamento idAgendamento={Number(id_agendamento)} />
      <Rodape />
    </div>
  );
}

export default PDetalhesAgendamentoPage;