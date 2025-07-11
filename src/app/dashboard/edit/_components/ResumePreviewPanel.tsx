"use client";

import React from 'react';
import ResumePreview from './ResumePreview';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { InfoType, Section } from '@/store/useResumeStore';
import useMobile from '@/app/hooks/useMobile';
import { Tools } from './Tools';
import { Wand2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ResumePreviewPanelProps {
  info: InfoType;
  sections: Section;
  sectionOrder: string[];
  previewScale: number;
  setPreviewScale: (scale: number) => void;
  onShowAI: () => void;
  templateId: string;
  isAiJobRunning: boolean;
}

const ResumePreviewPanel: React.FC<ResumePreviewPanelProps> = ({
  info,
  sections,
  sectionOrder,
  setPreviewScale,
  onShowAI,
  templateId,
  isAiJobRunning
}) => {
  const { isMobile } = useMobile();
  const { t } = useTranslation();

  return (
    <section
      className="flex-1 flex items-center justify-center bg-black relative overflow-hidden max-h-screen"
    >
      <TransformWrapper
        initialScale={0.6}
        minScale={0.5}
        maxScale={2}
        limitToBounds={false}
        onTransformed={(_ref, state) => setPreviewScale(state.scale)}
        onInit={(controls) => controls.centerView(0.5, 0)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%',maxHeight: '100vh' }}
              contentStyle={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: '100%', paddingTop: '5rem', paddingBottom: '5rem' }}
            >
              <div className="relative">
                <ResumePreview 
                  info={info} 
                  sections={sections} 
                  sectionOrder={sectionOrder} 
                  templateId={templateId} 
                />
                {isAiJobRunning && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
                    <Wand2 size={48} className="text-sky-400 animate-pulse" />
                    <p className="text-white text-lg mt-4 animate-pulse">{t('editPage.ai.generatingSuggestion')}</p>
                  </div>
                )}
              </div>
            </TransformComponent>

            <Tools isMobile={isMobile} zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} info={info} onShowAI={onShowAI} />
          </>
        )}
      </TransformWrapper>
    </section>
  );
};

export default ResumePreviewPanel; 