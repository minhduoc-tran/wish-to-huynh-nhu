import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
}

export const BouncingHearts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hearts = useRef<Heart[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createHeart = (): Heart => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
    });

    hearts.current = new Array(15).fill(0).map(() => createHeart());

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.current.forEach((heart) => {
        heart.x += heart.dx;
        heart.y += heart.dy;

        if (heart.x - heart.size < 0 || heart.x + heart.size > canvas.width) {
          heart.dx *= -1;
        }
        if (heart.y - heart.size < 0 || heart.y + heart.size > canvas.height) {
          heart.dy *= -1;
        }

        ctx.font = `${heart.size}px Arial`;
        ctx.fillStyle = 'red';
        ctx.fillText('❤️', heart.x, heart.y);
      });

      requestAnimationFrame(update);
    };

    update();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className='fixed top-0 left-0 w-full h-full' />
  );
};

export const LoveButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      className='relative flex items-center justify-center z-50'
      onClick={onClick}
    >
      {/* Sóng lan tỏa liên tục */}
      <motion.div
        className='absolute w-20 h-20 bg-pink-400 rounded-full opacity-50'
        // animate={{
        //   scale: [1, 2.5],
        //   opacity: [0.5, 0],
        //   transition: { duration: 1.2, repeat: Infinity, ease: 'easeOut' },
        // }}
      />
      {/* Button chính */}
      <motion.button
        className='px-6 py-3 text-white bg-pink-500 rounded-full shadow-lg text-lg font-bold relative'
        whileTap={{ scale: 0.9 }}
        // animate={{
        //   rotate: [-15, 15, -15], // Rung lắc mạnh
        //   transition: { repeat: Infinity, duration: 0.9, ease: 'easeInOut' },
        // }}
      >
        💖 NHẤN NGAY 💖
      </motion.button>
    </div>
  );
};

export const LoveLetterPopup: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const message_1 = 'Hi Như iu của anh, anh đây.';
  const message_2 = 'Chúc em một ngày vui vẻ nhá hihi.';
  const message_3 = 'Iuuuu 💖';

  return (
    <motion.div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='relative w-80 h-60 flex flex-col items-center justify-end'
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'tween', stiffness: 100 }}
      >
        {/* Phong bì */}
        <div className='relative w-full h-40 bg-red-500 rounded-b-lg overflow-hidden flex items-end justify-center border-4 border-dashed border-red-700'>
          <motion.div
            className='absolute w-full h-20 bg-red-600 rounded-t-lg top-0 left-0'
            initial={{ y: 0 }}
            animate={{ y: -50 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Lá thư */}
        <motion.div
          className='absolute max-w-[320px]  w-full h-36 bg-white border-4 border-dashed border-red-400 rounded-md p-4 shadow-lg flex flex-col items-center justify-center font-handwriting'
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: -30, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className='text-red-500  font-bold text-xl'>
            💌 Gửi lời chúc đến{' '}
            <span className='font-bold text-pink-600'>Huỳnh Như</span>
            💌
          </p>
          <p className='text-gray-700 w-full block text-start text-lg'>
            {message_1.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </p>
          <p className='text-gray-700 w-full block text-start text-lg'>
            {message_2.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </p>
          <p className='text-gray-700 w-full block text-end text-lg'>
            {message_3.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2 }}
              >
                {char}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </motion.div>
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className='mt-4 px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600'
      >
        Đóng
      </button>
    </motion.div>
  );
};

export const Exec = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <LoveButton onClick={() => setIsOpen(true)} />
      {isOpen && <LoveLetterPopup onClose={() => setIsOpen(false)} />}

      <BouncingHearts />
    </>
  );
};
