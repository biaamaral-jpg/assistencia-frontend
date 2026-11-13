import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesEquipamento from "../../../components/Listagens/DetalhesEquipamento/DetalhesEquipamento";
import Rodape from "../../../components/Rodape/Rodape";

function PDetalhesEquipamentoPage(): JSX.Element {
  const { id_equipamento } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navegacao />
      <DetalhesEquipamento idEquipamento={Number(id_equipamento ?? 0)} />
      <Rodape />
    </div>
  );
}

export default PDetalhesEquipamentoPage;