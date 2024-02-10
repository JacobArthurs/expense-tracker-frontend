import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

export const TypingTypography = ({ children, speed, ...typographyProps }) => {
    useEffect(() => {
        const text = children;
        const spans = document.querySelectorAll('.typing-span');
    
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex < text.length) {
            spans[currentIndex].style.opacity = '1';
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, speed);
    
        return () => clearInterval(interval);
      }, [children, speed]);
    
      return (
        <Typography {...typographyProps}>
          {children.split('').map((char, index) => (
            <span key={index} className="typing-span" style={{ opacity: '0', transition: `opacity ${speed / 1000}s ease-in-out` }}>
              {char}
            </span>
          ))}
        </Typography>
      );
  };