import { MessageCircle, X } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ask } from '../utils/chatbot';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

function ChatWidget({
  open,
  onClose,
  messages,
  onSend,
  isSending,
  title,
  subtitle,
  placeholder,
  sendLabel,
  sendingLabel,
}: {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSend: (text: string) => Promise<void>;
  isSending: boolean;
  title: string;
  subtitle: string;
  placeholder: string;
  sendLabel: string;
  sendingLabel: string;
}) {
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;
    setInput('');
    await onSend(text);
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 w-[calc(100%-2rem)] max-w-md transition-all duration-300 ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50">
              <MessageCircle className="text-teal-primary h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex max-h-80 flex-col gap-3 overflow-y-auto px-4 py-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-teal-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <input
              className="focus:ring-teal-primary w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              placeholder={placeholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending}
              className="text-white rounded-xl bg-teal-primary px-4 py-2 text-sm font-semibold transition hover:bg-teal-600 disabled:opacity-60"
            >
              {isSending ? sendingLabel : sendLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ChatAssistant() {
  const { t } = useLanguage();
  const chatStrings = {
    title: t.chat?.title || 'TrailAZ Live Chat',
    subtitle: t.chat?.subtitle || 'FAQ assistant',
    greeting:
      t.chat?.greeting ||
      "Hi! I'm the TrailAZ FAQ assistant. Ask me about mountains, routes, safety, pricing, or trip planning.",
    placeholder: t.chat?.placeholder || 'Ask about mountains, routes, safety...',
    send: t.chat?.send || 'Send',
    sending: t.chat?.sending || 'Sending...',
    fallback: t.chat?.fallback || 'Sorry, I could not generate a reply right now.',
    error: t.chat?.error || 'Sorry, I had trouble answering that. Please try again.',
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', text: chatStrings.greeting },
  ]);

  // Allow other parts of the app to open the chat (e.g., FAQ CTA).
  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  // Refresh greeting when language changes.
  React.useEffect(() => {
    setChatMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', text: chatStrings.greeting }];
      }
      return prev;
    });
  }, [chatStrings.greeting]);

  const handleSendMessage = async (text: string) => {
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setIsSending(true);
    try {
      const reply = await ask(text);
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', text: reply || chatStrings.fallback },
      ]);
    } catch (error) {
      console.error('Chat error', error);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: chatStrings.error,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-teal-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{chatStrings.liveChatButton || t.faq?.liveChat || 'Live Chat'}</span>
      </button>
      <ChatWidget
        open={isOpen}
        onClose={() => setIsOpen(false)}
        messages={chatMessages}
        onSend={handleSendMessage}
        isSending={isSending}
        title={chatStrings.title}
        subtitle={chatStrings.subtitle}
        placeholder={chatStrings.placeholder}
        sendLabel={chatStrings.send}
        sendingLabel={chatStrings.sending}
      />
    </>
  );
}
