interface UserQuizResult {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    reference: string;
    isCorrect: boolean;
}

interface PerformanceData {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
    timeSpent: string;
    reviewData: UserQuizResult[];
    streak: number;
}

// Converte milissegundos para formato MM:SS
const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return `${pad(minutes)}:${pad(seconds)}`;
};

export function useQuizPerformance(results: UserQuizResult[], timeElapsedMs: number): PerformanceData {
    const totalQuestions = results.length;
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const timeSpent = formatTime(timeElapsedMs);
    
    // Cálculo da maior sequência (streak)
    let currentStreak = 0;
    let maxStreak = 0;
    for (const result of results) {
        if (result.isCorrect) {
            currentStreak++;
        } else {
            maxStreak = Math.max(maxStreak, currentStreak);
            currentStreak = 0;
        }
    }
    maxStreak = Math.max(maxStreak, currentStreak); // último streak vai ser contado

    return {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        accuracy,
        timeSpent,
        reviewData: results,
        streak: maxStreak,
    };
}