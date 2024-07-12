'use client';
import logo from '@/assets/images/logo.png';
import user from '@/assets/images/user.png';
import { VanishInput } from '@/components/ui';
import { cn } from '@/utils/cn';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect } from 'react';

const ExcalidrawWrapper = dynamic(
  async () => (await import('@/components/excalidraw')).default,
  {
    ssr: false,
  }
);

const chatHistoryQuery = {
  queryKey: ['chatHistory'],
  queryFn: async () => {
    const response = await fetch('/api/plan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
};
interface ChatBubble {
  content: string;
  role: string;
}

function Plan() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null);
  const messageContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: messageContainerRef });
  const [botThinking, setBotThinking] = React.useState(false);
  const [buttonToScroll, setButtonToScroll] = React.useState(false);
  const { data, status } = useQuery(chatHistoryQuery);
  const [mindMapData, setMindMapData] = React.useState<string>('');
  const [chat, setChat] = React.useState<ChatBubble[]>(
    status === 'success' ? data.history : []
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setButtonToScroll(latest < 0.6);
  });

  useEffect(() => {
    if (status === 'success') {
      setChat(data.history);
      if (data.history.length > 0)
        setMindMapData(data.history[data.history.length - 1].content);
    }
  }, [status]);

  useEffect(() => {
    scrollToBottom();
    setButtonToScroll(false);
  }, [chat]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (botThinking) return;
    const planData = new FormData(e.currentTarget).get('plan') as string;
    const newChat = [...chat, { content: planData, role: 'user' }];
    setChat(newChat);
    setChat([...newChat, { content: 'loadingggg', role: 'bot' }]);
    setBotThinking(true);
    const response = await fetch('/api/plan', {
      method: 'POST',
      body: JSON.stringify({ plan: planData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setChat([...newChat, { content: data.message, role: 'bot' }]);
    setBotThinking(false);
    setMindMapData(data.message);
  };

  const placeholders = [
    'Create a plan to build a house',
    'How to develop a mobile game',
    'Increase the revenue of a business',
    'Design an effective marketing strategy',
    'Develop a successful e-commerce website',
    'How to start a tech startup',
    'Create a project management plan',
    'Improve customer satisfaction and retention',
    'Develop a mobile app for a business',
    'Strategies for successful business expansion',
    'Create a financial plan for a new venture',
    'How to conduct market research',
    'Build a brand identity for a business',
    'Develop a user-friendly web application',
    'How to secure funding for a startup',
    'Optimize business operations for efficiency',
    'How to build a strong online presence',
    'Create a content marketing plan',
    'Design a user interface for a product',
    'How to manage a remote team effectively',
    'Develop a business plan for a new product',
  ];

  return (
    <div className='mx-auto w-[80vw] rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      <div className='flex h-[20vh] flex-col items-center justify-center px-4'>
        <h2 className='text-center text-xl text-black dark:text-white sm:text-5xl'>
          Share your Plan
        </h2>
      </div>
      <div className='relative h-full w-full'>
        <div
          className='flex h-[70vh] w-full flex-col items-center overflow-y-auto'
          ref={messageContainerRef}
        >
          <AnimatePresence>
            {buttonToScroll && (
              <button
                className='absolute -right-7 bottom-10 z-50'
                onClick={scrollToBottom}
              >
                <motion.svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='100'
                  height='100'
                  viewBox='0 0 50 50'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ pathLength: 0 }}
                    cx='12'
                    cy='12'
                    r='10'
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ pathLength: 0 }}
                    d='M12 8v8'
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ pathLength: 0 }}
                    d='m8 12 4 4 4-4'
                  />
                </motion.svg>
              </button>
            )}
          </AnimatePresence>

          {status === 'pending' ? (
            <Spinner color='primary' size='lg' />
          ) : (
            chat.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className={cn(
                  `mb-5 flex w-full items-end gap-3`,
                  chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                <Image
                  src={chat.role === 'user' ? user : logo}
                  alt='avatar'
                  className='h-[50px] w-[50px] rounded-full'
                />
                <div
                  className={cn(
                    'max-w-[85%] rounded-xl p-2 text-white dark:text-black',
                    chat.role === 'user'
                      ? 'bg-teal-400 p-2 dark:bg-sky-700'
                      : 'bg-teal-500 p-2 dark:bg-sky-800'
                  )}
                >
                  {chat.content === 'loadingggg' ? (
                    <Spinner color='primary' size='lg' />
                  ) : (
                    chat.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  )}
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <VanishInput
          placeholders={placeholders}
          chatHistory={chat
            .filter((e) => e.role === 'user')
            .map((e) => e.content)}
          onChange={handleChange}
          onSubmit={onSubmit}
          name='plan'
        />
        <ExcalidrawWrapper mindmapData={mindMapData} />
      </div>
    </div>
  );
}

export default Plan;

// const url = `http://www.plantuml.com/plantuml/svg/${encoded}`;
// console.log(url);
// const img = new window.Image();
// img.crossOrigin = 'Anonymous';
// img.src = url;
// img.onload = () => {
//   setMindMapData(img);
// };
