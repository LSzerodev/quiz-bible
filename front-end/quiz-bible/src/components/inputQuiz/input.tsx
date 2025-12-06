import styles from './input.module.css'
import type { InputHTMLAttributes } from 'react'

export function InputQuiz(props: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type="text" placeholder='Digite o tema do seu quiz…'  className={styles.input} {...props}/>
    )
}