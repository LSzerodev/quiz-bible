import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizPerformance } from "../../../hooks/useQuizPerformance"; 
import styles from "./relatorio.module.css";
import { CiTrophy, CiClock1, CiCircleCheck, CiWarning } from "react-icons/ci";
import { BiTargetLock } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";

interface ReportState {
  results: Parameters<typeof useQuizPerformance>[0];
  timeElapsedMs: number;
  quizId: string;
}

export default function QuizReport() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showReview, setShowReview] = useState(true);

    const reportState = location.state as ReportState;
    
    const { results, timeElapsedMs } = reportState || {};
    const performanceData = useQuizPerformance(results || [], timeElapsedMs || 0);

    if (!reportState || !reportState.results) {
        return (
            <div className={styles.Container}>
                <div className={styles.ReportCard}>
                    <p>Dados do quiz não encontrados. Volte para a tela inicial.</p>
                </div>
            </div>
        );
    }

    const {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        timeSpent,
        reviewData,
        streak,
    } = performanceData;

    const getPerformanceMessage = (acc: number) => {
        if (acc >= 90)
            return {
                message: "Excelente! Você domina as Escrituras!",
                verse: "Lâmpada para os meus pés é a tua palavra - Salmos 119:105",
            };
        if (acc >= 70)
            return {
                message: "Muito bem! Continue estudando!",
                verse: "Bem-aventurados os que ouvem a palavra - Lucas 11:28",
            };
        if (acc >= 50)
            return {
                message: "Bom trabalho! Há espaço para crescer!",
                verse: "Cresce na graça e conhecimento - 2 Pedro 3:18",
            };
        return {
            message: "Continue firme! A prática leva à perfeição!",
            verse: "Não desista de fazer o bem - Gálatas 6:9",
        };
    };

    const performance = getPerformanceMessage(accuracy);

    const handleNewQuiz = () => {
        navigate("/quiz");
    };

    return (
        <div className={styles.Container}>
            <div className={styles.ReportCard}>
                <header className={styles.ReportHeader}>
                    <h1>📊 Relatório do Quiz </h1>
                    <hr className={styles.Divider} />
                </header>

                <section className={styles.PerformanceSummary}>
                    <div className={styles.ScoreDisplay}>
                        <CiTrophy className={styles.TrophyIcon} aria-label="Troféu" />
                        <div className={styles.PercentYTrophyGroup}>
                            <h2 className={styles.AccuracyText}>{accuracy}% </h2>
                            <span style={{ fontSize: "1.5rem" }}>Aproveitamento</span>
                        </div>
                        <p className={styles.ScoreCount}>
                            <strong>{correctAnswers}</strong> de{" "}
                            <strong>{totalQuestions}</strong> corretas
                        </p>
                    </div>

                    <div className={styles.StudentFeedback}>
                        <h3 className={styles.FeedbackMessage}>{performance.message}</h3>
                        <p className={styles.BibleQuote}>"{performance.verse}"</p>
                    </div>
                </section>

                <hr className={styles.Divider} />

                <section className={styles.StatsGrid} aria-label="Estatísticas do quiz">
                    <article className={styles.StatItem} tabIndex={0}>
                        <CiCircleCheck
                            className={styles.StatIcon}
                            aria-hidden="true"
                            color="#10B981"
                        />
                        <span className={styles.StatValue}>{correctAnswers}</span>
                        <span className={styles.StatLabel}>Acertos</span>
                    </article>

                    <article className={styles.StatItem} tabIndex={0}>
                        <CiWarning
                            className={styles.StatIcon}
                            aria-hidden="true"
                            color="#8f0404"
                        />
                        <span className={styles.StatValue}>{wrongAnswers}</span>
                        <span className={styles.StatLabel}>Erros</span>
                    </article>

                    <article className={styles.StatItem} tabIndex={0}>
                        <BiTargetLock
                            className={styles.StatIcon}
                            aria-hidden="true"
                            color="F59E0B"
                        />
                        <span className={styles.StatValue}>{streak}X</span>
                        <span className={styles.StatLabel}>Maior Sequência</span>
                    </article>

                    <article className={styles.StatItem} tabIndex={0}>
                        <CiClock1
                            className={styles.StatIcon}
                            aria-hidden="true"
                            color="white"
                        />
                        <span className={styles.StatValue}>{timeSpent}</span>
                        <span className={styles.StatLabel}>Tempo Total</span>
                    </article>
                </section>

                <hr className={styles.Divider} />

                <section className={styles.ReviewSection}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <h2 className={styles.ReviewTitle}>📚 Revisão de Perguntas</h2>
                        <button
                            onClick={() => setShowReview(!showReview)}
                            style={{
                                background: "transparent",
                                border: "2px solid var(--primary-color)",
                                color: "var(--primary-color)",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "var(--primary-color)";
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--primary-color)";
                            }}
                        >
                            {showReview ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>

                    {showReview && (
                        <div className={styles.QuestionList}>
                            {reviewData.map((item, index) => (
                                <article
                                    key={index} 
                                    className={`${styles.ReviewItem} ${
                                        item.isCorrect ? styles.Correct : styles.Wrong
                                    }`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <h4 className={styles.QuestionText}>
                                        {index + 1}. {item.question}
                                    </h4>
                                    <p className={styles.UserAnswer}>
                                        Sua resposta: <strong>{item.userAnswer}</strong>
                                    </p>
                                    <div className={styles.CorrectInGroup}>
                                        <p className={styles.Reference}>
                                            📖 **{item.isCorrect ? "Explicação" : "Dica"}**:{" "}
                                            {item.reference}
                                        </p>
                                        {!item.isCorrect && (
                                            <p className={styles.CorrectAnswer}>
                                                Resposta correta: <strong>{item.correctAnswer}</strong>
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <div className={styles.ActionArea}>
                    <button
                        className={styles.NewQuizButton}
                        onClick={handleNewQuiz}
                        aria-label="Gerar novo quiz"
                    >
                        <HiOutlineRefresh
                            style={{
                                display: "inline",
                                marginRight: "8px",
                                fontSize: "1.3rem",
                                verticalAlign: "middle",
                            }}
                        />
                        Novo Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}