import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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

  const faqs: { question: string; answer: string }[] = t.faq?.items ?? defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
            <button className="rounded-lg border-2 border-white px-6 py-3 text-white transition-colors hover:bg-white/10">
              {t.faq?.liveChat || 'Live Chat'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
