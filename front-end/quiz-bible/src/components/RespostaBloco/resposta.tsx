import styles from './resposta.module.css'

interface RespostaProps {
    children: React.ReactNode
}

export function Respostas({children}: RespostaProps){
    return(
        <article className={styles.respostaBloco}>
            {children}
        </article>
    );
}