'use client';
import { VanishInput } from '@/components/ui';
import { cn } from '@/utils/cn';
import { Avatar } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

interface ChatBubble {
  text: string;
  sender: string;
}

function Plan() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const [chat, setChat] = React.useState<ChatBubble[]>([]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planData = new FormData(e.currentTarget).get('plan') as string;
    const newChat = [...chat, { text: planData, sender: 'user' }];
    setChat(newChat);
    const response = await fetch('/api/plan', {
      method: 'POST',
      body: JSON.stringify({ plan: planData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setChat([...newChat, { text: data.message, sender: 'bot' }]);
  };

  useEffect(() => {
    return () => {};
  }, []);
  const placeholders = [
    'Create a plan to build a house',
    'How to develop a mobile game',
    'Increase the revenue of a business',
  ];
  return (
    <div className='mx-auto w-[80vw] rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8'>
      <div className='flex h-[20vh] flex-col items-center justify-center px-4'>
        <h2 className='text-center text-xl text-black dark:text-white sm:text-5xl'>
          Share your Plan
        </h2>
      </div>
      <div className='flex h-[70vh] w-full flex-col overflow-y-auto'>
        {chat.map((chat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              `mb-5 flex w-full gap-3`,
              chat.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            <Avatar
              src={
                chat.sender === 'user'
                  ? 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                  : 'https://play-lh.googleusercontent.com/YB1h4DpRYgiPb1OmdvtEecfOaUtRTvUAk2bvqjq_v3IqF698O25vm2eKr_pgFeGYpA'
              }
            />
            <div
              className={cn(
                'max-w-[85%] rounded-xl p-2 text-white dark:text-black',
                chat.sender === 'user'
                  ? 'bg-teal-400 p-2 dark:bg-sky-700'
                  : 'bg-teal-500 p-2 dark:bg-sky-800'
              )}
            >
              {chat.text}
            </div>
          </motion.div>
        ))}
      </div>

      <VanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        name='plan'
      />
    </div>
  );
}

export default Plan;
