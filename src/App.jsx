import { useState } from "react"
import { Assistant } from "./assistants/googleai"
import { Loader } from "./components/Loader/Loader"
import { Chat } from "./components/Chat/Chat"
import { Controls } from "./components/Controls/Controls"
import styles from "./App.module.css"

function App() {
  const assistant = new Assistant()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] =useState(false)

    function addMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

  async function handleContentSend(content){
    addMessage({ content, role: "user" })
    setIsLoading(true)
    try {
      const result = await assistant.chat(content, messages)
      addMessage({ content: result, role: "assistant" })
    } catch (error) {
      addMessage({ content: 'Sorry, saya tidak dapat memproses permintaan anda. Tolong coba lagi', 
        role: "system" 
      })
    } finally{
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" alt="chatbot" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  )
}

export default App
