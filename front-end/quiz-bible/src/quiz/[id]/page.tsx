import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../perguntas.module.css';

interface QuizData {
    tema: string;
    nivel_de_dificuldade: string;
    perguntas: Question[];
    quantidade_alternativas: number;    
}

interface Question {
    enunciado: string;
    alternativas: string[];
    correta: number;
    dica: string;
    explicacao: string;
}

interface UserQuizResult {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    reference: string;
    isCorrect: boolean;
}

interface Alternativa {
    id: number;
    texto: string;
    correta: boolean;
}

export default function Perguntas() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: quizId } = useParams();
    const quizData = location.state?.quizData as QuizData;

    const [alternativaSelecionada, setAlternativaSelecionada] = useState<number | null>(null);
    const [respondido, setRespondido] = useState(false);
    const [perguntaAtual, setPerguntaAtual] = useState<number>(0);
    const [quizResults, setQuizResults] = useState<UserQuizResult[]>([]);
    const [startTime] = useState(() => Date.now());

    if (!quizData) {
        return (
            <div className={styles.quizContainer}>
                <p>Carregando ou quiz não encontrado...</p>
            </div>
        );
    }

    if (perguntaAtual >= quizData.perguntas.length) {
        return null;
    }

    const perguntaAtualObj = quizData.perguntas[perguntaAtual];

    // const numAlternativas = quizData.quantidade_alternativas;

    const alternativas: Alternativa[] = perguntaAtualObj.alternativas.map((texto, index) => ({
        id: index + 1,
        texto: texto,
        correta: index === perguntaAtualObj.correta,
    }));

    const alternativaCorreta = alternativas.find(alt => alt.correta);
    const acertou = respondido && alternativaSelecionada === alternativaCorreta?.id;

    const handleSelectAlternativa = (id: number) => {
        if (!respondido) {
            setAlternativaSelecionada(id);
        }
    };

    const handleConfirmar = () => {
        if (alternativaSelecionada !== null) {
            setRespondido(true);

            const pergunta = perguntaAtualObj;
            const respostaCorretaIndex = pergunta.correta;
            const respostaCorretaTexto = pergunta.alternativas[respostaCorretaIndex];

            const acertou = alternativaSelecionada === (respostaCorretaIndex + 1);
            const userAnswerText = pergunta.alternativas[alternativaSelecionada - 1];

            const newResult: UserQuizResult = {
                question: pergunta.enunciado,
                userAnswer: userAnswerText,
                correctAnswer: respostaCorretaTexto,
                reference: acertou ? pergunta.explicacao : pergunta.dica,
                isCorrect: acertou,
            };

            setQuizResults(prev => [...prev, newResult]);
        }
    };

    const handleProximaPergunta = () => {
        if (!respondido) return;

        if (perguntaAtual === quizData.perguntas.length - 1) {
            const timeElapsedMs = Date.now() - startTime;

            const pergunta = perguntaAtualObj;
            const respostaCorretaIndex = pergunta.correta;
            const respostaCorretaTexto = pergunta.alternativas[respostaCorretaIndex];
            const acertou = alternativaSelecionada === (respostaCorretaIndex + 1);
            const userAnswerText = alternativaSelecionada !== null
                ? pergunta.alternativas[alternativaSelecionada - 1]
                : '';

            const lastResult: UserQuizResult = {
                question: pergunta.enunciado,
                userAnswer: userAnswerText,
                correctAnswer: respostaCorretaTexto,
                reference: acertou ? pergunta.explicacao : pergunta.dica,
                isCorrect: acertou,
            };

            const allResults = [...quizResults, lastResult];

            navigate(`/quiz/${quizId}/relatorio`, {
                state: {
                    results: allResults,
                    timeElapsedMs: timeElapsedMs,
                    quizId: quizId
                }
            });
        } else {
            setPerguntaAtual(perguntaAtual + 1);
            setAlternativaSelecionada(null);
            setRespondido(false);
        }
    };

    return (
        <div className={styles.quizContainer}>
            <section className={styles.quizContentWrapper}>
                <div className={styles.quizCard}>

                    <div className={styles.quizQuestionArea}>
                        <h4>{perguntaAtual + 1}. {perguntaAtualObj.enunciado}</h4>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${((perguntaAtual + 1) / quizData.perguntas.length) * 100}%` }}
                            />
                        </div>
                        <span className={styles.progressText}>
                            {perguntaAtual + 1} de {quizData.perguntas.length}
                        </span>
                    </div>

                    <div className={styles.quizOptions}>
                        {alternativas.map((alternativa) => {
                            const selecionada = alternativaSelecionada === alternativa.id;
                            const mostrarCorreta = respondido && alternativa.correta;
                            const mostrarErrada = respondido && selecionada && !alternativa.correta;

                            return (
                                <article
                                    key={alternativa.id}
                                    className={`
                                        ${styles.questionItem}
                                        ${selecionada && !respondido ? styles.selected : ''}
                                        ${mostrarCorreta ? styles.correct : ''}
                                        ${mostrarErrada ? styles.incorrect : ''}
                                    `.trim()}
                                    onClick={() => handleSelectAlternativa(alternativa.id)}
                                >
                                    <div className={styles.alternativaContent}>
                                        <span>{alternativa.texto}</span>
                                        {mostrarCorreta && (
                                            <span className={styles.icon}>✅</span>
                                        )}
                                        {mostrarErrada && (
                                            <span className={styles.icon}>❌</span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {respondido && (
                        <div className={`${styles.feedback} ${acertou ? styles.feedbackSuccess : styles.feedbackError}`}>
                            {acertou ? (
                                <>
                                    <span className={styles.feedbackIcon}>🎉</span>
                                    <p>Parabéns! Você acertou!</p>
                                    <p className={styles.explanation}>
                                        <strong>Explicação:</strong> {perguntaAtualObj.explicacao}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <span className={styles.feedbackIcon}>😔</span>
                                    <p>Resposta incorreta.</p>
                                    <p className={styles.hint}>
                                        <strong>Dica:</strong> {perguntaAtualObj.dica}
                                    </p>
                                    <p className={styles.correctAnswerText}>
                                        A resposta correta era: <strong>{alternativaCorreta?.texto}</strong>
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    <div className={styles.actionButtons}>
                        {!respondido ? (
                            <button
                                className={styles.btnConfirmar}
                                onClick={handleConfirmar}
                                disabled={alternativaSelecionada === null}
                            >
                                Confirmar Resposta
                            </button>
                        ) : (
                            <button
                                className={styles.btnProxima}
                                onClick={handleProximaPergunta}
                            >
                                {perguntaAtual < quizData.perguntas.length - 1
                                    ? "Próxima Pergunta →"
                                    : "Finalizar Quiz 🎉"}
                            </button>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}