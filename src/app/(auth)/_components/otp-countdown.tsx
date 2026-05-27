'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/ui/button';

type OtpCountdownProps = {
  initialTime: number;
  onResend: () => void;
  isLoading: boolean;
};

const OtpCountdown = ({
  initialTime,
  onResend,
  isLoading,
}: OtpCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft]);

  const resendHandler = () => {
    if (isLoading) return;
    onResend();
    setTimeLeft(initialTime);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  if (timeLeft <= 0) {
    return (
      <Button
        mode="ghost"
        type="button"
        onClick={resendHandler}
        isLoading={isLoading}
      >
        ارسال مجدد
      </Button>
    );
  }

  return (
    <span className="text-primary-900 text-body-sm-400 text-center">
      {minutes}:{seconds}
    </span>
  );
};

export default OtpCountdown;
