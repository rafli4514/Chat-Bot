import { useState } from "react";
import { Assistant } from "./assistants/googleai";
import { Loader } from "./components/Loader/Loader";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function updateLastMessageContent(content) {
    setMessages(() =>
      prevMessages.map((message, index) =>
        index === prevMessages.length - 1
          ? { ...message, content: `${message.content}${content}` }
          : message
      )
    );
  }

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chatStream(content);
      const isfirstChunk = false;

      for await (const chunk of result) {
        if (!isfirstChunk) {
          isfirstChunk = true;
          addMessage({ content: "", role: "assistant" });
          setIsLoading(false);
        }

        updateLastMessageContent(chunk)
      }

      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content:
          "Sorry, saya tidak dapat memproses permintaan anda. Tolong coba lagi",
        role: "system",
      });
      setIsLoading(false);
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
      <Controls isDisable={isLoading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
