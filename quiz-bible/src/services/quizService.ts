interface QuizRequestData {
    prompt: string;
    nivel_de_dificuldade: "facil" | "medio" | "dificil";
    quantidade_alternativas: number;
}

interface Question {
    enunciado: string;
    alternativas: string[];
    correta: number;
    dica: string;
    explicacao: string;
}

interface QuizData {
    tema: string;
    nivel_de_dificuldade: 'facil' | 'medio' | 'dificil';
    quantidade_alternativas: number;
    perguntas: Question[];
}

interface QuizResponse {
    id: string;
    quizJson: QuizData;
}

export async function createQuizQuestion(data: QuizRequestData): Promise<QuizResponse> {

    const res = await fetch('https://quiz-student-bible.up.railway.app/quiz', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });


    if (!res.ok) {
        const errorBody = await res.json();
        console.error("Erro do Backend (Status != 200):", errorBody);
        throw new Error(errorBody.error || `Erro HTTP: ${res.status} ${res.statusText}`);
    }

    if (!res.body) {
        throw new Error("Resposta sem body.");
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    let buffer = '';
    let rawJson = '';
    let quizId = '';
    
    let jsonCompleted = false;
    let idCompleted = false;

    while (!jsonCompleted || !idCompleted) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        let eventEndIndex = buffer.indexOf('\n\n');
        
        while (eventEndIndex !== -1) {
            const eventBlock = buffer.substring(0, eventEndIndex).trim();
            buffer = buffer.substring(eventEndIndex + 2); 

            const lines = eventBlock.split(/\r?\n/);
            let currentEvent: string | null = null;
            let currentData: string | null = null;

            for (const line of lines) {
                if (line.startsWith('event:')) {
                    currentEvent = line.replace(/^event:\s*/, '').trim();
                } else if (line.startsWith('data:')) {
                    currentData = (currentData || '') + line.replace(/^data:\s*/, '');
                }
            }

            if (currentEvent === 'quiz-json' && currentData) {
                rawJson += currentData;
                jsonCompleted = true;
            } else if (currentEvent === 'quiz-id' && currentData) {
                quizId = currentData.trim();
                idCompleted = true;
            } else if (currentEvent === 'error' && currentData) {

                const errorObj = JSON.parse(currentData);
                throw new Error(`Erro do servidor (SSE): ${errorObj.message || JSON.stringify(errorObj)}`);
            }

            eventEndIndex = buffer.indexOf('\n\n');
        }
    }
    
    if (!rawJson || !quizId) {
        throw new Error("Não foi possível obter o JSON do quiz ou a ID completa do servidor.");
    }

    try {
        const parsedData = JSON.parse(rawJson.trim());
        
        return {
            id: quizId,
            quizJson: parsedData
        };
    } catch (err) {
        console.error("Erro ao fazer parse do JSON final:", err);
        throw new Error("JSON final inválido recebido.");
    }
}