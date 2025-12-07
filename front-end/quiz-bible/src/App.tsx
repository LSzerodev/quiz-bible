import styles from "./styles/App.module.css";
import quizImg from "./img/RightImgQuiz.webp";
import bobImg from "./img/bobImg.webp";
import Modal from "./components/modal/modal";
import { useState } from "react";

export  function App() {
  const [ modalOpen, setModalOpen ] = useState(false);
  return (
    <>
      <section className={styles.Container}>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        <div className={styles.SubContainer}>
          <div className={styles.ContentLeft}>
            <h1>
              <span>Estude</span> a Bíblia de forma <span>divertida</span> e{" "}
              <span>interativa</span>
            </h1>
            <p>
              Nosso chat bíblico transforma o estudo em uma experiência
              interativa, incentivando o aprendizado através de quizzes.
            </p>
                <button className={styles.pushable} onClick={() => setModalOpen(true) }>
              <span className={styles.shadow}></span>
              <span className={styles.edge}></span>
              <span className={styles.front}> Testar agora </span>
            </button>
          </div>
          <div className={styles.ContentRight}>
            <img src={quizImg} alt="imagem quiz" className={styles.quizImg} />
          </div>
        </div>
      </section>
      <div className={styles.bobImgWrapper}>
        <img src={bobImg} alt="Decoracao" className={styles.bobImg} />
      </div>

      <section className={styles.ContainerSecond}>
        <div className={styles.SubContainerSecond}>
          <h1 className={styles.background}>CRISTO</h1>

          <div className={styles.ContentLeftSecond}>
            <h1>Com foco em aprender e estudar a biblia</h1>
          </div>
          <div className={styles.ContentRightSecond}>
            <h5>
              Estude a Bíblia de forma interativa, com quizzes e conteúdos
              educativos direto de casa.
            </h5>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
