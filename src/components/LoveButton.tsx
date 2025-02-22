import { motion } from 'framer-motion';

export const LoveButton: React.FC = () => {
  return (
    <motion.button
      className='px-6 py-3 text-white bg-pink-500 rounded-full shadow-lg text-lg font-bold relative 
                 hover:bg-pink-600 transition duration-300'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        rotate: [-5, 5, -5], // Lắc nhẹ trái phải
        transition: { repeat: Infinity, duration: 0.3, ease: 'easeInOut' },
      }}
    >
      💖 Nhấn vào đây 💖
    </motion.button>
  );
};
