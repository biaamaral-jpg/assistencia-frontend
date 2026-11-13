import { type JSX } from "react";
import { useParams } from "react-router-dom";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesCliente from "../../../components/Listagens/DetalhesCliente/DetalhesCliente";
import Rodape from "../../../components/Rodape/Rodape";

function PDetalhesClientePage(): JSX.Element {
    const { id_cliente } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesCliente idCliente={Number(id_cliente ?? 0)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesClientePage;