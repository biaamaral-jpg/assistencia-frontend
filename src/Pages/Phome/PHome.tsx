import type { JSX } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";
import AuthRequests from "../../fetch/AuthRequest";
import EquipamentoRequest from "../../fetch/EquipamentoRequest";
import type { EquipamentoDTO } from "../../dto/EquipamentoDTO";

function PHome(): JSX.Element {
    const [equipamentos, setEquipamentos] = useState<EquipamentoDTO[]>([]);
    const [carregando, setCarregando] = useState(false);

    const isAuthenticated = (() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    })();

    useEffect(() => {
        if (!isAuthenticated) return;

        const carregarEquipamentos = async () => {
            setCarregando(true);
            try {
                const resposta = await EquipamentoRequest.listar();
                setEquipamentos(Array.isArray(resposta) ? resposta : []);
            } catch (error) {
                console.error('Erro ao carregar equipamentos da home:', error);
                setEquipamentos([]);
            } finally {
                setCarregando(false);
            }
        };

        carregarEquipamentos();
    }, [isAuthenticated]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navegacao />

            <main className="main-wrapper" style={{ flex: 1 }}>
                <BoasVindas />

                <section className="home-dashboard">
                    <article className="dashboard-card dashboard-card-primary">
                        <div className="dashboard-icon">＋</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Agendamento</span>
                            <h3>Novo atendimento</h3>
                            <p>Agende serviços e acompanhe o status dos clientes em tempo real.</p>
                        </div>
                        <Link to={isAuthenticated ? '/cadastro/agendamento' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Cadastrar agora' : 'Entre para agendar'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-secondary">
                        <div className="dashboard-icon">👤</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Clientes</span>
                            <h3>Gerenciar cadastro</h3>
                            <p>Cadastre e mantenha os dados dos clientes para cada ordem de serviço.</p>
                        </div>
                        <Link to={isAuthenticated ? '/cadastro/cliente' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Gerenciar clientes' : 'Faça login'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-tall">
                        <div className="dashboard-icon">🖥️</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Equipamentos</span>
                            <h3>Controle de aparelhos</h3>
                            <p>Cadastro e organização dos equipamentos por cliente, tipo e modelo.</p>
                        </div>
                        <Link to={isAuthenticated ? '/cadastro/equipamento' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Cadastrar equipamento' : 'Acessar sistema'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-secondary">
                        <div className="dashboard-icon">✎</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Gestão</span>
                            <h3>Atualizar cadastro</h3>
                            <p>Revise e mantenha os dados de clientes e equipamentos sempre corretos.</p>
                        </div>
                        <Link to={isAuthenticated ? '/lista/equipamentos' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Atualizar agora' : 'Faça login'}
                        </Link>
                    </article>

                    <article className="dashboard-card dashboard-card-tall">
                        <div className="dashboard-icon">📋</div>
                        <div className="dashboard-content">
                            <span className="dashboard-badge">Listagem</span>
                            <h3>Equipamentos recentes</h3>
                            <p>Veja rapidamente os aparelhos cadastrados e o histórico de serviços.</p>
                        </div>
                        <Link to={isAuthenticated ? '/lista/equipamentos' : '/login'} className="dashboard-cta">
                            {isAuthenticated ? 'Abrir listagem' : 'Acessar lista'}
                        </Link>
                    </article>
                </section>

                <section className="products-panel">
                    <div className="products-panel-header">
                        <div>
                            <span className="panel-kicker">Overview</span>
                            <h2>{isAuthenticated ? 'Equipamentos recentes' : 'Acesso rápido'}</h2>
                        </div>
                        {isAuthenticated && <Link to="/lista/equipamentos" className="panel-link">Ver todos</Link>}
                    </div>

                    {isAuthenticated ? (
                        carregando ? (
                            <div className="products-loading">Carregando equipamentos...</div>
                        ) : (
                            <div className="products-table-wrap">
                                <table className="products-table">
                                    <thead>
                                        <tr>
                                            <th>Tipo</th>
                                            <th>Modelo</th>
                                            <th>Marca</th>
                                            <th>Cliente</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipamentos.length > 0 ? (
                                            equipamentos.slice(0, 5).map((equipamento) => (
                                                <tr key={equipamento.idEquipamento ?? equipamento.idCliente ?? equipamento.tipo}>
                                                    <td>{equipamento.tipo}</td>
                                                    <td>
                                                        <div className="product-name-box">
                                                            <strong>{equipamento.modelo}</strong>
                                                            <span>{equipamento.marca}</span>
                                                        </div>
                                                    </td>
                                                    <td>{equipamento.marca}</td>
                                                    <td>{equipamento.idCliente ?? '—'}</td>
                                                    <td>
                                                        <span className="status-badge active">
                                                            Ativo
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="empty-state">Nenhum equipamento cadastrado ainda.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="guest-panel">
                            <p>Faça login para visualizar os equipamentos cadastrados, agendar atendimentos e manter o histórico dos clientes.</p>
                            <Link to="/login" className="guest-button">Ir para login</Link>
                        </div>
                    )}
                </section>
            </main>

            <Rodape />
        </div>
    );
}

export default PHome;