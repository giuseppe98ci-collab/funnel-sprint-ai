import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={twMerge(
        'bg-[#FBC737] text-[#010B32] font-bold py-4 px-8 rounded-lg shadow-[0_0_30px_rgba(251,199,55,0.4)] hover:shadow-[0_0_50px_rgba(251,199,55,0.6)] transition-all duration-300 uppercase tracking-wide text-lg',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
