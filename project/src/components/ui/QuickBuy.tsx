import React from 'react';

interface QuickBuyProps {
  solAmount: string;
  onBuy: () => void;
}

const QuickBuy: React.FC<QuickBuyProps> = ({ solAmount, onBuy }) => {
  return (
    <button
      onClick={onBuy}
      className="bg-accent-blue hover:bg-accent-blue/90 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
    >
      Buy {solAmount} SOL
    </button>
  );
};

export default QuickBuy;