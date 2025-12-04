import styles from './btn.module.css'
import { IoSend } from "react-icons/io5";

export function BtnQuiz(prop: React.ButtonHTMLAttributes<HTMLButtonElement>){
    return(
            <>
                <button className={styles.btn} {...prop}>
                    <h5>Iniciar quiz</h5>
                    <span><IoSend color='#F3C873'/></span>
                </button>
            </>
    )
}