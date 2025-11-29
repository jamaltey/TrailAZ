import { cn } from '@/lib/utils';
import { Eye, Settings, Type, X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityPanelProps {
  onTextSizeChange: (size: TextSize) => void;
  onContrastToggle: () => void;
  onDyslexiaFontToggle: () => void;
  textSize: TextSize;
  highContrast: boolean;
  dyslexiaFont: boolean;
}

export function AccessibilityPanel({
  onTextSizeChange,
  onContrastToggle,
  onDyslexiaFontToggle,
  textSize,
  highContrast,
  dyslexiaFont,
}: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const textSizes: { value: TextSize; label: string }[] = [
    { value: 'normal', label: t('accessibility.normal') },
    { value: 'large', label: t('accessibility.large') },
    { value: 'xlarge', label: t('accessibility.xlarge') },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-primary fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label={t('accessibility.tools')}
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="glass accessibility-panel animate-fade-in-up fixed right-6 bottom-24 z-50 w-80 rounded-2xl shadow-2xl">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-gray-900">{t('accessibility.tools')}</h3>
              <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Text Size */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Type className="h-5 w-5 text-gray-600" />
                  <p className="text-gray-700">{t('accessibility.textSize')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {textSizes.map(size => (
                    <button
                      key={size.value}
                      onClick={() => onTextSizeChange(size.value)}
                      className={cn(
                        'flex-1 rounded-lg border px-3 py-2 transition-colors wrap-normal',
                        textSize === size.value
                          ? 'border-teal-primary bg-teal-primary text-white'
                          : 'hover:border-teal-primary border-gray-300 bg-white'
                      )}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast */}
              <div>
                <button
                  onClick={onContrastToggle}
                  className="hover:border-teal-primary flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{t('accessibility.highContrast')}</span>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full transition-colors ${
                      highContrast ? 'bg-teal-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        highContrast ? 'ml-6' : 'ml-0.5'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Dyslexia-Friendly Font */}
              <div>
                <button
                  onClick={onDyslexiaFontToggle}
                  className="hover:border-teal-primary flex w-full items-center justify-between rounded-lg border border-gray-300 p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Type className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{t('accessibility.dyslexiaFont')}</span>
                  </div>
                  <div
                    className={`h-6 w-12 rounded-full transition-colors ${
                      dyslexiaFont ? 'bg-teal-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        dyslexiaFont ? 'ml-6' : 'ml-0.5'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Additional Tools (Visual Only) */}
              {/* <div className="space-y-2 border-t border-gray-200 pt-4">
                <button className="flex w-full items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-100">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{t('accessibility.audioDescription')}</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
