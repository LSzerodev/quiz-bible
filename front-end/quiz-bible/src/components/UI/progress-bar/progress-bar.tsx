import styles from './progress-bar.module.css';

/**
 * Componente de Barra de Progresso Responsiva
 * * @param {object} props
 * @param {number} props.value - O progresso atual (por exemplo, 75)
 * @param {number} [props.max=100] - O valor máximo (padrão é 100)
 */
interface ProgressBarProps {
    value: number; // O 'value' deve ser um número
    max?: number;  // 'max' é opcional e também um número
}

export function ProgressBar({ value, max = 100 }: ProgressBarProps) {
    // Calcula a porcentagem para garantir a exibição correta
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    // Exibe a porcentagem formatada (para A11Y e melhor UX)
    const displayValue = `${Math.round(percentage)}%`;

    return (
        <div 
            className={styles.progressBarContainer}
            // Para acessibilidade: Indica que o conteúdo está sendo atualizado
            role="status"
            aria-live="polite"
        >
            
            {/* O elemento <progress> é semântico e acessível nativamente */}
            <progress
                className={styles.progressBar}
                value={value}
                max={max}
                // Para leitores de tela: Indica o valor atual e o rótulo
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label="Barra de Progresso"
            >
                {/* Fallback content para navegadores que não suportam <progress> */}
                {displayValue}
            </progress>
            
            {/* Estilização alternativa usando div (mais fácil de estilizar o preenchimento em todos os browsers) */}
            <div className={styles.progressBarVisual}>
                <div 
                    className={styles.progressBarFill}
                    style={{ width: displayValue }}
                >
                    {/* Opcional: Exibe o texto dentro da barra para melhor UX */}
                    <span className={styles.fillValue}>{displayValue}</span>
                </div>
            </div>
        </div>
    );
}