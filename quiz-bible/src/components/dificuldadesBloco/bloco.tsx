import styles from './bloco.module.css'

interface blocoProps {
    children: React.ReactNode
    onClick?: () => void
    isSelected?: boolean
}

export function Bloco({children , isSelected, onClick}: blocoProps){
    return(
        <>
            <article 
            className={`${styles.bloco} ${isSelected ? styles.blocoActive : ''}`}
            onClick={onClick}
            role='button'
            
            >
                {children}
            </article>
        </> 
    )
}