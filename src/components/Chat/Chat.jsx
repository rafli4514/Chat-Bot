import Markdown from 'react-markdown'
import styles from './Chat.module.css'
import { useRef, useEffect } from 'react'


const WELCOME_MESSAGE = {
    role: 'assistant',
    content: 'Halo! Bagaimana saya membantu kamu sekarang?'
}

export function Chat({ messages }) {
    const messagesEndRef = useRef(null)

    useEffect(() =>{
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
    <div className={styles.Chat}>
        {[WELCOME_MESSAGE, ...messages].map(({ role, content }, index) => (
            <div key={index} className={styles.Message} data-role={role}>
                <Markdown>{content}</Markdown>
            </div>
        ))}
        <div ref={messagesEndRef} />
    </div>
    )
}

