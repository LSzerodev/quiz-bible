import { IoCloseOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import styles from './modal.module.css'; 
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react"; 

interface ModalTypes {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalTypes) {
  const { user } = useAuth(); 
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && isOpen) {
      onClose(); 
      navigate('/quiz');
    }
  }, [user, isOpen, onClose, navigate]);
  
  if (!isOpen) return null;

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      // O onAuthStateChanged do AuthContext vai detectar automaticamente
      // e o useEffect acima vai executar fechando o modal e redirecionando
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <IoCloseOutline 
          className={styles.iconClose} 
          onClick={onClose}
          aria-label="Fechar Modal"
        />

        <header>
          <h2>Bem-vindo(a)!</h2>
        </header>

        <p>
          Para acessar a área de quizzes e acompanhar seu progresso, por favor, faça login ou crie sua conta utilizando o botão abaixo.
        </p>

        <button 
          className={styles.btnLogin}
          onClick={loginGoogle}
        >
          <span><FaGoogle /></span>
          <span>Continuar com Google</span>
        </button>

        <p className={styles.separator}>
          Ao continuar, você aceita nossos 
          <a href="/termos" className={styles.secondaryLink}> Termos de Serviço</a>.
        </p>
      </div>
    </div>
  );
}