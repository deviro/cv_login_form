import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const LinedBackground = () => {
  const lineSpacing = 100; // pixels between lines

  const [verticalLines, setVerticalLines] = useState<number>(0);
  const [horizontalLines, setHorizontalLines] = useState<number>(0);

  const calculateLines = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const verticalLines = Math.ceil(screenWidth / lineSpacing);
    const horizontalLines = Math.ceil(screenHeight / lineSpacing);
    
    return { verticalLines, horizontalLines };
  };

  useEffect(() => {
    // Set initial line count
    setVerticalLines(calculateLines().verticalLines);
    setHorizontalLines(calculateLines().horizontalLines);

    // Update lines when window is resized
    const handleResize = () => {
      const newCounts = calculateLines();
      if (newCounts.verticalLines !== verticalLines || 
          newCounts.horizontalLines !== horizontalLines) {
        setVerticalLines(newCounts.verticalLines);
        setHorizontalLines(newCounts.horizontalLines);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [verticalLines, horizontalLines]);

  return (
    <div className={styles.linedBackground}>
      <div id="verticalLinesContainer" className={styles.verticalLinesContainer} style={{gap: `${lineSpacing}px`}}>
        {[...Array(verticalLines)].map((_, index) => (
          <div
            key={`v-${index}`}
            className={styles.verticalLine}
          />
        ))}
      </div>
      <div id="horizontalLinesContainer" className={styles.horizontalLinesContainer} style={{gap: `${lineSpacing}px`}}>
        {[...Array(horizontalLines)].map((_, index) => (
          <div
            key={`h-${index}`}
            className={styles.horizontalLine}
          
          />
        ))}
      </div>
    </div>
  );
};
