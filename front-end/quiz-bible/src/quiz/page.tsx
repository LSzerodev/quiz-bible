import { useNavigate } from "react-router-dom";
import { BtnQuiz } from "../components/buttonQuiz/btnquiz";
import { Bloco } from "../components/dificuldadesBloco/bloco";
import { InputQuiz } from "../components/inputQuiz/input";
import styles from "./quiz.module.css";
import { useState } from "react";
import { createQuizQuestion } from "../services/quizService";

type DificuldadeType = "facil" | "medio" | "dificil";

export default function Quiz() {
  const navigate = useNavigate();

  const [inputTema, setInputTema] = useState<string>('');
  const [dificuldade, setDificuldade] = useState<DificuldadeType | null>(null);
  const [numAlternativas, setNumAlternativas] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const blocos = [
    { emoji: "😄", label: "Facil", value: "facil" as const },
    { emoji: "🤔", label: "Médio", value: "medio" as const },
    { emoji: "🫣", label: "Dificil", value: "dificil" as const },
  ];

  const numbers = [
    { number: 2 },
    { number: 3 },
    { number: 4 },
  ];

  async function questionApi() {
    if (!inputTema || !dificuldade || numAlternativas === null) {
      console.log("Por favor, preencha todos os campos.");
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {

      const quizData = {
        prompt: inputTema,
        nivel_de_dificuldade: dificuldade,
        quantidade_alternativas: numAlternativas
      };

      const { id: newQuizId, quizJson } = await createQuizQuestion(quizData);

      navigate(`/quiz/${newQuizId}`, { state: { quizData: quizJson } });

    } catch(err) {
      alert('Erro ao criar o quiz. Verifique o console para mais detalhes.' + err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectDificuldade = (value: DificuldadeType) => {
    setDificuldade(value);
  };

  const handleSelectAlternativas = (num: number) => {
    if (!loading) {
      setNumAlternativas(num);
    }
  };

  console.log({ inputTema, dificuldade, numAlternativas });

  if (loading) {
    return (
      <div className={styles.Container}>
        <span className={styles.Loader}></span>
      </div>
    );
  }
  
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.SubContainer}>
          <div className={styles.Quiz}>
            <div className={styles.ContentHeader}>
              <h3>Quiz Biblico</h3>
              <InputQuiz 
                value={inputTema}
                onChange={(e) => setInputTema(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.dificuldades}>
              <p>Dificuldade</p>
              <div className={styles.ContainerBloco}>
                {blocos.map((item, index) => (
                  <Bloco 
                    key={index}
                    isSelected={dificuldade === item.value}
                    onClick={() => handleSelectDificuldade(item.value)}
                  >
                    <span>{item.emoji}</span>
                    <p>{item.label}</p>
                  </Bloco>
                ))}
              </div>
            </div>

            <div className={styles.Alternativas}>
              <p>Numeros de alternativas</p>
              <div className={styles.ContainerNumbers}>
                {numbers.map((item, index) => (
                  <Bloco 
                    key={index}
                    onClick={() => handleSelectAlternativas(item.number)} 
                    isSelected={numAlternativas === item.number} 
                  >
                    {item.number}
                  </Bloco>
                ))}
              </div>
            </div>
            <BtnQuiz
              onClick={questionApi}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}