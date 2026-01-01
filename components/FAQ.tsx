import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ZoomSection } from './ui/ZoomSection';
import { InteractiveHeading } from './ui/InteractiveHeading';

const faqs = [
  {
    question: "What is your typical turnaround time?",
    answer: "For branding projects, it usually takes 2-3 weeks. Web design and development can take 4-8 weeks depending on complexity. Rush delivery is available upon request."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. I provide 30 days of free support after launch to ensure everything runs smoothly. After that, I offer maintenance packages to keep your digital assets updated."
  },
  {
    question: "What is the payment structure?",
    answer: "I typically require a 50% deposit to secure your slot in my schedule, with the remaining 50% due upon project completion and before final file delivery."
  },
  {
    question: "Do you provide source files?",
    answer: "Yes, you will receive full ownership of all source files (AI, PSD, Figma) upon final payment. Your intellectual property is yours."
  },
  {
    question: "Can you work with my existing brand guidelines?",
    answer: "Of course. I can adapt to your existing visual language or help you evolve it into something new while respecting your core identity."
  }
];

const AccordionItem = ({ i, expanded, setExpanded, question, answer }: any) => {
  const isOpen = i === expanded;

  return (
    <motion.div 
      initial={false}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setExpanded(isOpen ? false : i)}
        className="flex items-center justify-between w-full py-8 text-left group"
      >
        <span className="text-xl md:text-2xl font-bold text-gray-300 group-hover:text-white transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`p-2 rounded-full border ${isOpen ? 'border-green-500 text-green-500' : 'border-white/20 text-white'} group-hover:border-white transition-colors`}
        >
          <Plus size={24} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginBottom: 32 },
              collapsed: { opacity: 0, height: 0, marginBottom: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="text-gray-400 leading-relaxed text-lg max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  return (
    <section className="py-32 px-6 md:px-20 bg-[#050505] relative z-20">
      <div className="max-w-4xl mx-auto relative z-10">
        <ZoomSection className="mb-20 text-center">
            <h2 className="text-sm font-bold tracking-[0.3em] text-green-500 uppercase mb-4">Common Queries</h2>
            <div className="text-4xl md:text-5xl font-black text-white flex justify-center">
                <InteractiveHeading text="Frequently Asked" />
            </div>
        </ZoomSection>

        <div className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem 
                key={i} 
                i={i} 
                expanded={expanded} 
                setExpanded={setExpanded} 
                question={faq.question} 
                answer={faq.answer} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;