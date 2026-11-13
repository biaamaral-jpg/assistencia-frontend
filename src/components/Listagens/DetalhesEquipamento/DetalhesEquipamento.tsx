import { useEffect, useState, type JSX } from "react";
import EquipamentoRequests from "../../../fetch/EquipamentoRequest";
import type { EquipamentoDTO } from "../../../dto/EquipamentoDTO";
import { useNavigate } from "react-router-dom";
import Utilitario from "../../../Utils/Utilitario";


interface DetalhesEquipamentoProps {
    idEquipamento: number;
}


function DetalhesEquipamento({
    idEquipamento

}: DetalhesEquipamentoProps): JSX.Element {

    const [equipamento, setEquipamento] = useState<EquipamentoDTO | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {

        async function buscarDados() {

            setLoading(true);

            setError(null);

            try {

                const dados =
                    await EquipamentoRequests.obterEquipamentoPorId(idEquipamento);

                if (dados) {

                    setEquipamento(dados);

                } else {

                    setError("Equipamento não encontrado.");

                }

            } catch (err) {

                console.error(
                    "Erro ao carregar detalhes do equipamento:",
                    err
                );

                setError(
                    "Ocorreu um erro ao buscar as informações do equipamento."
                );

            } finally {

                setLoading(false);

            }
        }

        if (idEquipamento) {
            buscarDados();
        }

    }, [idEquipamento]);


    if (loading) {

        return (

            <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">

                <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">

                    <div className="animate-pulse">

                        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>

                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-8"></div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {[1, 2, 3, 4, 5, 6].map((item) => (

                                <div key={item}>

                                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>

                                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </main>
        );
    }




    if (error || !equipamento) {

        return (

            <main className="bg-gray-200 flex-1 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 text-center">

                    <div className="text-red-500 text-5xl mb-4">

                        <i className="pi pi-exclamation-triangle"></i>

                    </div>

                    <h2 className="text-xl font-bold text-slate-800 mb-2">

                        Equipamento não encontrado

                    </h2>

                    <p className="text-slate-500 mb-6">

                        {error || "Não foi possível encontrar este equipamento."}

                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/lista/equipamentos")}
                        className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-bold transition-all"
                    >

                        Voltar para Equipamentos

                    </button>

                </div>

            </main>
        );
    }


    return (

        <main style={{
            flex: 1,
            padding: '32px 20px 40px',
            background: 'radial-gradient(circle at top, #eff6ff 0%, #e0f2fe 30%, #f8fafc 100%)',
            overflowY: 'auto'
        }}>

            <div style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>

                <div style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    boxShadow: '0 24px 70px rgba(59, 130, 246, 0.18)',
                    border: '1px solid rgba(147, 197, 253, 0.7)',
                    background: '#fff'
                }}>

                    <div style={{
                        background: 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 40%, #4338ca 100%)',
                        color: '#fff',
                        padding: '32px 28px'
                    }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>

                            <div>
                                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', opacity: 0.9 }}>Equipamento</p>
                                <h1 style={{ margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 14, fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900 }}>
                                    <span style={{
                                        display: 'inline-flex',
                                        width: 52,
                                        height: 52,
                                        borderRadius: 16,
                                        background: 'rgba(255,255,255,0.12)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)'
                                    }}>
                                        <i className="pi pi-box" style={{ fontSize: 22 }}></i>
                                    </span>
                                    {equipamento.tipo}
                                </h1>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 999,
                                    border: '1px solid rgba(255,255,255,0.22)',
                                    background: 'rgba(255,255,255,0.12)',
                                    padding: '0.7rem 1rem',
                                    fontSize: 14,
                                    fontWeight: 700
                                }}>
                                    <i className="pi pi-tag"></i>
                                    {equipamento.marca}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '28px' }}>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                            <div style={{ background: '#f8fafc', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>ID</p>
                                <div style={{ marginTop: 12, fontSize: 22, fontWeight: 800, color: '#0f172a' }}>#{equipamento.idEquipamento ?? '—'}</div>
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>Modelo</p>
                                <div style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{equipamento.modelo}</div>
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: 18, padding: 20, border: '1px solid #e2e8f0' }}>
                                <p style={{ margin: 0, color: '#64748b', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 800 }}>Cliente</p>
                                <div style={{ marginTop: 12, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{equipamento.idCliente ?? 'Não informado'}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 28, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <button type="button" onClick={() => navigate('/lista/equipamentos')} style={{ flex: 1, minWidth: 200, border: '1px solid #cbd5e1', borderRadius: 18, background: '#fff', color: '#334155', padding: '0.95rem 1.2rem', fontWeight: 800, cursor: 'pointer' }}>
                                Voltar para a lista
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DetalhesEquipamento;