import React, { useState } from "react";
import AgendamentoRequests from "../../../fetch/AgendamentoRequest";
import type { AgendamentoDTO } from "../../../dto/AgendamentoDTO";

interface FormAgendamentoProps {
  agendamentos?: AgendamentoDTO[];
  onSuccess?: () => void;
}

interface FormData {
  idCliente: string;
  idEquipamento: string;
  dataHora: string;
  status: AgendamentoDTO["status"];
}

export default function FormAgendamento({ agendamentos = [], onSuccess }: FormAgendamentoProps) {
  const [formData, setFormData] = useState<FormData>({
    idCliente: "",
    idEquipamento: "",
    dataHora: new Date().toISOString().slice(0, 16),
    status: "Pendente",
  });
  const [erroTela, setErroTela] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroTela(null);

    if (!formData.idCliente || !formData.idEquipamento || !formData.dataHora) {
      setErroTela("Erro ao cadastrar: preencha cliente, equipamento e data/hora.");
      return;
    }

    const payload: AgendamentoDTO = {
      idCliente: Number(formData.idCliente),
      idEquipamento: Number(formData.idEquipamento),
      dataHora: formData.dataHora,
      status: formData.status,
    };

    try {
      await AgendamentoRequests.criar(payload);
      alert("Agendamento cadastrado com sucesso!");
      setFormData({
        idCliente: "",
        idEquipamento: "",
        dataHora: new Date().toISOString().slice(0, 16),
        status: "Pendente",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
      setErroTela(`Erro ao cadastrar: ${mensagem}`);
    }
  };

  return (
    <div>
      <div className="product-form-wrapper">
        <div className="product-form-card">
          <h2>Cadastro de Agendamento</h2>
          {erroTela && <div className="product-form-error">{erroTela}</div>}

          <form onSubmit={handleSubmit}>
            <div className="product-form-section">
              <div className="product-form-group">
                <label>ID do Cliente:</label>
                <input
                  type="number"
                  name="idCliente"
                  value={formData.idCliente}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form-group">
                <label>ID do Equipamento:</label>
                <input
                  type="number"
                  name="idEquipamento"
                  value={formData.idEquipamento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form-section">
              <div className="product-form-group">
                <label>Data e hora:</label>
                <input
                  type="datetime-local"
                  name="dataHora"
                  value={formData.dataHora}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form-group">
                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluído">Concluído</option>
                </select>
              </div>
            </div>

            <div className="product-form-actions">
              <button type="submit" className="product-btn-submit">
                Cadastrar Agendamento
              </button>
              <button
                type="reset"
                className="product-btn-reset"
                onClick={() =>
                  setFormData({
                    idCliente: "",
                    idEquipamento: "",
                    dataHora: new Date().toISOString().slice(0, 16),
                    status: "Pendente",
                  })
                }
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      {agendamentos.length > 0 && (
        <section className="produtos-cadastrados">
          <h3>Agendamentos Cadastrados ({agendamentos.length})</h3>
          <div className="produtos-grid">
            {agendamentos.map((item, index) => (
              <div key={item.idAgendamento ?? index} className="product-card">
                <h4>Agendamento #{item.idAgendamento ?? index + 1}</h4>
                <p><strong>Cliente:</strong> {item.idCliente}</p>
                <p><strong>Equipamento:</strong> {item.idEquipamento}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
