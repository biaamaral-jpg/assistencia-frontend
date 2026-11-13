import React, { useState } from "react";
import EquipamentoRequests from "../../../fetch/EquipamentoRequest";
import type { EquipamentoDTO } from "../../../dto/EquipamentoDTO";

interface FormEquipamentoProps {
  equipamentos?: EquipamentoDTO[];
  onSuccess?: () => void;
}

interface FormData {
  idCliente: string;
  tipo: string;
  marca: string;
  modelo: string;
}

export default function FormEquipamento({ equipamentos = [], onSuccess }: FormEquipamentoProps) {
  const [formData, setFormData] = useState<FormData>({
    idCliente: "",
    tipo: "",
    marca: "",
    modelo: "",
  });
  const [erroTela, setErroTela] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroTela(null);

    if (!formData.tipo.trim() || !formData.marca.trim() || !formData.modelo.trim()) {
      setErroTela("Erro ao cadastrar: preencha tipo, marca e modelo.");
      return;
    }

    const payload: EquipamentoDTO = {
      idCliente: formData.idCliente.trim() ? Number(formData.idCliente) : undefined,
      tipo: formData.tipo,
      marca: formData.marca,
      modelo: formData.modelo,
    };

    try {
      await EquipamentoRequests.criar(payload);
      alert("Equipamento cadastrado com sucesso!");
      setFormData({ idCliente: "", tipo: "", marca: "", modelo: "" });
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
          <h2>Cadastro de Equipamento</h2>
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
                />
              </div>

              <div className="product-form-group">
                <label>Tipo:</label>
                <input
                  type="text"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form-section">
              <div className="product-form-group">
                <label>Marca:</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="product-form-group">
                <label>Modelo:</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="product-form-actions">
              <button type="submit" className="product-btn-submit">
                Cadastrar Equipamento
              </button>
              <button
                type="reset"
                className="product-btn-reset"
                onClick={() => setFormData({ idCliente: "", tipo: "", marca: "", modelo: "" })}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      {equipamentos.length > 0 && (
        <section className="produtos-cadastrados">
          <h3>Equipamentos Cadastrados ({equipamentos.length})</h3>
          <div className="produtos-grid">
            {equipamentos.map((item, index) => (
              <div key={item.idEquipamento ?? index} className="product-card">
                <h4>{item.tipo}</h4>
                <p><strong>Marca:</strong> {item.marca}</p>
                <p><strong>Modelo:</strong> {item.modelo}</p>
                <p><strong>Cliente:</strong> {item.idCliente ?? "—"}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}