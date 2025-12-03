import React, { useState } from 'react';
import styles from './placar.module.css';
// Importação de ícones: Check para correto e X para errado
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { ProgressBar } from '../progress-bar/progress-bar';

export function Placar() {
    // Simulando a contagem (você substituirá por props ou estado real da aplicação)
    const [corretas, setCorretas] = useState(15);
    const [erradas, setErradas] = useState(5);

    // O percentual de acerto pode ser um bom feedback UX
    const total = corretas + erradas;
    const percentualCorreto = total > 0 ? ((corretas / total) * 100).toFixed(0) : 0;

    return (
        <div className={styles.placarContainer}>
            {/* Título/Resumo do Placar */}
            <h2 className={styles.placarTitle}>Seu Desempenho</h2>
            
            {/* Seção Principal do Placar */}
            <div className={styles.placarContent}>
                
                {/* 1. Card de Respostas Corretas (Feedback Positivo) */}
                <div className={`${styles.card} ${styles.cardCorretas}`}>
                    <div className={styles.iconWrapper}>
                        {/* Ícone grande e chamativo para clareza */}
                        <FaCheckCircle size={40} className={styles.iconCorretas} />
                    </div>
                    <div className={styles.textWrapper}>
                        <span className={styles.label}>Corretas</span>
                        <span className={styles.count}>{corretas}</span>
                    </div>
                </div>

                {/* 2. Card de Respostas Erradas (Feedback de Atenção) */}
                <div className={`${styles.card} ${styles.cardErradas}`}>
                    <div className={styles.iconWrapper}>
                        {/* Ícone grande e chamativo para clareza */}
                        <FaTimesCircle size={40} className={styles.iconErradas} />
                    </div>
                    <div className={styles.textWrapper}>
                        <span className={styles.label}>Erradas</span>
                        <span className={styles.count}>{erradas}</span>
                    </div>
                </div>
            </div>

            {/* 3. Barra de Progresso e Percentual (Feedback Visual UX) */}
            <div className={styles.progressSection}>
                <p className={styles.progressText}>
                    Aproveitamento: **{percentualCorreto}%** de **{total}** Questões
                </p>
                <ProgressBar value={50}/>
            </div>
        </div>
    );
}