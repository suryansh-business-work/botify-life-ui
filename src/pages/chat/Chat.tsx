import { JSX, useEffect, useRef, useState } from 'react';
import { ChatBoxWrapper } from './ChatBoxWrapper';
import { formatDateTime } from '../../utils/formatDate';
import { useUserContext } from '../../providers/UserProvider';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import ChatInput from './ChatInput';
import ChatTopPannel from './ChatTopPannel';

interface Message {
  role: 'user' | 'bot' | 'system';
  botResponse: JSX.Element;
  timestamp: string;
  userContext?: any;
}

const Alert = MuiAlert as React.FC<{ severity: AlertColor; children: React.ReactNode }>;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sseConnected, setSseConnected] = useState<boolean>(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: AlertColor }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const { user } = useUserContext();
  const { chatBotId } = useParams<{ childBotType: string; chatBotId: string }>();

  useEffect(() => {
    if (!chatBotId) return;

    const url = `http://localhost:4001/chat-sse/events/${chatBotId}`;
    const eventSource = new window.EventSource(url);

    eventSource.onopen = () => {
      setSseConnected(true);
      setToast({ open: true, message: 'Chat Connected', severity: 'success' });
    };

    eventSource.onerror = () => {
      setSseConnected(false);
      setToast({ open: true, message: 'Chat Disconnected', severity: 'error' });
    };

    eventSource.addEventListener('history', (event: MessageEvent) => {
      try {
        const history = JSON.parse(event.data);
        const botMessages = Array.isArray(history) ? history : [];
        setMessages(
          botMessages.map((data: any) => ({
            role: data?.role || 'bot',
            botResponse: <p>{typeof data?.content === 'string' ? data.content : JSON.stringify(data?.content)}</p>,
            timestamp: formatDateTime(data?.createdAt || new Date().toISOString()),
            userContext: data?.userContext,
          }))
        );
      } catch {
        // fallback: ignore history if parsing fails
      }
    });

    eventSource.onmessage = (event: MessageEvent) => {
      setIsLoading(false);
      let text = event.data;
      try {
        const parsed = JSON.parse(text);
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            botResponse: <p>{parsed?.content}</p>,
            timestamp: formatDateTime(new Date().toISOString()),
            userContext: user,
          }
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            botResponse: <p>{text}</p>,
            timestamp: formatDateTime(new Date().toISOString()),
            userContext: user,
          }
        ]);
      }
    };

    eventSourceRef.current = eventSource;

    return () => {
      eventSource.close();
    };
  }, [chatBotId, user]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !sseConnected) {
      setToast({ open: true, message: 'Connection disconnected. Please wait...', severity: 'warning' });
      return;
    }
    const timestamp = formatDateTime(new Date().toISOString());
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        botResponse: <p>{userInput}</p>,
        timestamp,
      },
    ]);
    setIsLoading(true);

    await fetch('http://localhost:4001/chat-sse/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatBotId,
        userInput,
        userContext: user,
      }),
    });
    setUserInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-bot-wrapper">
        <ChatTopPannel />
        <ChatBoxWrapper messages={messages} isLoading={isLoading} />
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <ChatInput
                userInput={userInput}
                setUserInput={setUserInput}
                handleSendMessage={handleSendMessage}
                wsConnected={sseConnected}
              />
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Chat;
