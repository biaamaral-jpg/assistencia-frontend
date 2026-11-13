import React, { useState } from "react";
import ClienteRequests from "../../../fetch/ClienteRequest";
import type { ClienteDTO } from "../../../dto/ClienteDTO";

interface FormClienteProps {
	clientes?: ClienteDTO[];
	onSuccess?: () => void;
}

interface FormData {
	nome: string;
	email: string;
	endereco: string;
	telefone: string;
	cpf: string;
}

export default function FormCliente({ clientes = [], onSuccess }: FormClienteProps) {
	const [formData, setFormData] = useState<FormData>({
		nome: "",
		email: "",
		endereco: "",
		telefone: "",
		cpf: "",
	});
	const [erroTela, setErroTela] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErroTela(null);

		if (!formData.nome.trim() || !formData.telefone.trim() || !formData.endereco.trim()) {
			setErroTela("Erro ao cadastrar: preencha nome, telefone e endereço.");
			return;
		}

		const payload: ClienteDTO = {
			nome: formData.nome,
			email: formData.email.trim() ? formData.email : undefined,
			endereco: formData.endereco,
			telefone: formData.telefone,
			cpf: formData.cpf.trim() ? formData.cpf : undefined,
		};

		try {
			await ClienteRequests.criar(payload);
			alert("Cliente cadastrado com sucesso!");
			setFormData({ nome: "", email: "", endereco: "", telefone: "", cpf: "" });
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
					<h2>Cadastro de Cliente</h2>
					{erroTela && <div className="product-form-error">{erroTela}</div>}

					<form onSubmit={handleSubmit}>
						<div className="product-form-section">
							<div className="product-form-group">
								<label>Nome:</label>
								<input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
							</div>

							<div className="product-form-group">
								<label>Telefone:</label>
								<input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
							</div>
						</div>

						<div className="product-form-section full">
							<div className="product-form-group">
								<label>Endereço:</label>
								<textarea name="endereco" value={formData.endereco} onChange={handleChange} required />
							</div>
						</div>

						<div className="product-form-section">
							<div className="product-form-group">
								<label>Email:</label>
								<input type="email" name="email" value={formData.email} onChange={handleChange} />
							</div>

							<div className="product-form-group">
								<label>CPF:</label>
								<input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
							</div>
						</div>

						<div className="product-form-actions">
							<button type="submit" className="product-btn-submit">Cadastrar Cliente</button>
							<button type="reset" className="product-btn-reset" onClick={() => setFormData({ nome: '', email: '', endereco: '', telefone: '', cpf: '' })}>Limpar</button>
						</div>
					</form>
				</div>
			</div>

			{clientes.length > 0 && (
				<section className="produtos-cadastrados">
					<h3>Clientes Cadastrados ({clientes.length})</h3>
					<div className="produtos-grid">
						{clientes.map((item, index) => (
							<div key={item.idCliente ?? index} className="product-card">
								<h4>{item.nome}</h4>
								<p><strong>Email:</strong> {item.email ?? "—"}</p>
								<p><strong>Telefone:</strong> {item.telefone}</p>
								<p><strong>Endereço:</strong> {item.endereco}</p>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}

