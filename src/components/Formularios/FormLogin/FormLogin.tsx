import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthRequests from '../../../fetch/AuthRequest';
import styles from './FormLogin.module.css';

function LoginForm(): React.ReactNode {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    interface LoginData {
        email: string;
        senha: string;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const login: LoginData = { email, senha };

        try {
            const result = await AuthRequests.login(login);
            if (result.success) {
                window.location.href = '/';
                return;
            }

            alert(`Falha no login: ${result.message || 'e-mail ou senha inválidos, ou servidor indisponível.'}`);
        } catch (error) {
            console.error(`Erro ao tentar fazer login: ${error}`);
            const message = error instanceof Error ? error.message : 'Erro ao fazer login';
            alert(`Falha no login: ${message}`);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.loginShell}>
                <div className={styles.heroPanel}>
                    <div className={styles.heroBadge}>Assistência Técnica</div>

                    <h1>InfoTech</h1>
                    <p className={styles.heroText}>
                        Soluções rápidas para computadores, celulares, redes e equipamentos de escritório.
                    </p>

                    <div className={styles.featureList}>
                        <span>🛠️ Diagnóstico rápido</span>
                        <span>⚡ Reparo em até 48h</span>
                        <span>📋 Controle de atendimentos</span>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={styles.infoIcon}>✓</div>
                        <div>
                            <strong>Atendimento confiável</strong>
                            <p>Suporte técnico profissional com acompanhamento em cada etapa.</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formPanel}>
                    <div className={styles.brandRow}>
                        <div className={styles.brandMark}>IT</div>
                        <div>
                            <span className={styles.brandName}>InfoTech</span>
                            <small>Área administrativa</small>
                        </div>
                    </div>

                    <div className={styles.titleWrap}>
                        <h2>Bem-vindo de volta</h2>
                        <p>Faça login para acessar o painel da assistência.</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <label className={styles.field} htmlFor="email">
                            <span>E-mail</span>
                            <input
                                id="email"
                                type="email"
                                placeholder="seuemail@empresa.com"
                                value={email}
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className={styles.field} htmlFor="senha">
                            <span>Senha</span>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                autoComplete="current-password"
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </label>

                        <div className={styles.actionsRow}>
                            <label className={styles.remember}>
                                <input type="checkbox" />
                                Lembrar acesso
                            </label>

                            <Link to="/recuperar-senha" className={styles.forgotLink}>
                                Esqueci minha senha
                            </Link>
                        </div>

                        <button className={styles.primaryButton} type="submit">
                            Entrar no painel
                        </button>
                    </form>

                    <p className={styles.helpText}>
                        Precisa de ajuda? <a href="mailto:suporte@infotech.com.br">suporte@infotech.com.br</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;