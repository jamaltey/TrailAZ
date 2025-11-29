import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, X } from 'lucide-react';
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;
    setInput('');
    await onSend(text);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-full max-w-md transition-all duration-300 ${
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

const defaultFaqs = [
  {
    question: 'How do I book a mountain climbing trip?',
    answer:
      'Use the Smart Climb Planner to pick your mountain, dates, duration, and add-ons. Then hit "Generate Route & Book Now" for your itinerary and confirmation.',
  },
  {
    question: 'What safety measures are in place?',
    answer:
      'We provide safety briefings, emergency contacts, weather monitoring, first-aid readiness, and experienced local guides (when selected).',
  },
  {
    question: 'Which mountains and cities do you cover?',
    answer:
      '40+ destinations across Azerbaijan, including Shahdag, Bazarduzu, Tufandag, and routes from Baku, Ganja, Sheki, and regional centers.',
  },
  {
    question: 'What equipment and gear are included?',
    answer:
      'Standard trips include maps and safety guidance. Equipment Rental adds hiking poles, packs, camping gear (if needed), and technical gear for advanced routes.',
  },
  {
    question: 'Can I use the app offline in remote areas?',
    answer:
      'Yes. Download maps, itineraries, and safety info before departure to access them offline. Real-time weather still needs connectivity.',
  },
  {
    question: 'What languages are supported?',
    answer:
      'TrailAZ supports English, Russian, and Azerbaijani. Switch languages in the footer; all content and confirmations are localized.',
  },
  {
    question: 'Are there accessibility options for different abilities?',
    answer:
      'Enable Accessibility-Friendly Routes for gentler trails. We also support larger text, high contrast, dyslexia-friendly fonts, and adaptive guiding packages.',
  },
  {
    question: 'What is the cancellation and refund policy?',
    answer:
      'Full refund 14+ days out; 50% for 7-13 days; 25% for 3-6 days; within 48 hours is non-refundable. Weather cancellations by us are fully refunded or rescheduled.',
  },
];

export function FAQPage() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
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
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
    { role: 'assistant', text: chatStrings.greeting },
  ]);

  const faqs: { question: string; answer: string }[] = t.faq?.items ?? defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  React.useEffect(() => {
    const greeting = chatStrings.greeting;
    setChatMessages(prev =>
      prev.length === 1 && prev[0].role === 'assistant' ? [{ role: 'assistant', text: greeting }] : prev
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="bg-teal-lighter mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <HelpCircle className="h-8 w-8" style={{ color: 'var(--teal-primary)' }} />
          </div>
          <h1 className="mb-4 text-4xl text-gray-900 md:text-5xl" style={{ fontWeight: 700 }}>
            {t.faq?.title || 'Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-gray-600">
            {t.faq?.subtitle ||
              'Everything you need to know about planning your mountain adventure'}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <h3 className="pr-4 text-gray-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="text-teal-primary h-6 w-6 shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 shrink-0 text-gray-400" />
                )}
              </button>

              {openIndex === index && (
                <div className="animate-fade-in-up px-6 pb-5">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="from-teal-primary to-blue-primary mt-12 rounded-2xl bg-linear-to-r p-8 text-center text-white">
          <h2 className="mb-4 text-2xl" style={{ fontWeight: 700 }}>
            {t.faq?.stillHaveQuestions || 'Still Have Questions?'}
          </h2>
          <p className="mb-6 text-lg opacity-90">
            {t.faq?.teamHere || 'Our team is here to help you plan the perfect mountain adventure'}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="text-teal-primary rounded-lg bg-white px-6 py-3 transition-colors hover:bg-gray-100">
              {t.footer?.contactUs || 'Contact Support'}
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="rounded-lg border-2 border-white px-6 py-3 text-white transition-colors hover:bg-white/10"
            >
              {t.faq?.liveChat || 'Live Chat'}
            </button>
          </div>
        </div>
      </div>
      <ChatWidget
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSend={handleSendMessage}
        isSending={isSending}
        title={chatStrings.title}
        subtitle={chatStrings.subtitle}
        placeholder={chatStrings.placeholder}
        sendLabel={chatStrings.send}
        sendingLabel={chatStrings.sending}
      />
    </div>
  );
}
