import { useEffect, useRef, useState } from 'react';

interface AnimationProps {
  animationSpeed: number;
  animationLoopLength: number;
}

function useAnimationFrame({
  animationLoopLength,
  animationSpeed
}: AnimationProps) {
  const [time, setTime] = useState<number>(0);
  const animationIdRef = useRef<number>();

  const animate = () => {
    setTime(t => (t + animationSpeed) % animationLoopLength);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    animationIdRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(
    () => {
      window.requestAnimationFrame(animate);
      return () => window.cancelAnimationFrame(animationIdRef.current!);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return time;
}

export default useAnimationFrame;
