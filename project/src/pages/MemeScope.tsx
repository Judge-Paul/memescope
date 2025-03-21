import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import TokenCard from '../components/TokenCard';
import FilterPanel from '../components/FilterPanel';
import { sampleTokens, graduatingTokens, graduatedTokens } from '../data/tokens';
import type { CategoryState } from '../types/filters';

function MemeScope() {
  const [quickBuyAmount, setQuickBuyAmount] = useState('0.01');
  const [selectedPreset, setSelectedPreset] = useState('S1');
  const [categoryStates, setCategoryStates] = useState<{
    'newly-created': CategoryState;
    'about-to-graduate': CategoryState;
    'graduated': CategoryState;
  }>({
    'newly-created': {
      showFilters: false,
      filters: {
        search: '',
        pumpProgress: { min: '', max: '' },
        holders: { min: '', max: '' },
        devHolding: { min: '', max: '' },
        snipers: { min: '', max: '' },
        botHolders: { min: '', max: '' },
        age: { min: '', max: '' },
        currentLiquidity: { min: '', max: '' },
        volume: { min: '', max: '' },
        marketCap: { min: '', max: '' },
        transactions: { min: '', max: '' },
        buys: { min: '', max: '' },
        sells: { min: '', max: '' }
      }
    },
    'about-to-graduate': {
      showFilters: false,
      filters: {
        search: '',
        pumpProgress: { min: '', max: '' },
        holders: { min: '', max: '' },
        devHolding: { min: '', max: '' },
        snipers: { min: '', max: '' },
        botHolders: { min: '', max: '' },
        age: { min: '', max: '' },
        currentLiquidity: { min: '', max: '' },
        volume: { min: '', max: '' },
        marketCap: { min: '', max: '' },
        transactions: { min: '', max: '' },
        buys: { min: '', max: '' },
        sells: { min: '', max: '' }
      }
    },
    'graduated': {
      showFilters: false,
      filters: {
        search: '',
        pumpProgress: { min: '', max: '' },
        holders: { min: '', max: '' },
        devHolding: { min: '', max: '' },
        snipers: { min: '', max: '' },
        botHolders: { min: '', max: '' },
        age: { min: '', max: '' },
        currentLiquidity: { min: '', max: '' },
        volume: { min: '', max: '' },
        marketCap: { min: '', max: '' },
        transactions: { min: '', max: '' },
        buys: { min: '', max: '' },
        sells: { min: '', max: '' }
      }
    }
  });

  const toggleFilters = (category: 'newly-created' | 'about-to-graduate' | 'graduated') => {
    setCategoryStates(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        showFilters: !prev[category].showFilters
      }
    }));
  };

  const updateFilters = (
    category: 'newly-created' | 'about-to-graduate' | 'graduated',
    field: keyof CategoryState['filters'] | string,
    value: string | { min: string; max: string }
  ) => {
    setCategoryStates(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        filters: {
          ...prev[category].filters,
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">MEMESCOPE</h1>
        <p className="text-foreground-secondary mb-6">
          Customized real-time feeds of pump.fun tokens matching your selected preset filters.
        </p>
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-foreground-secondary">Quickbuy</span>
              <div className="relative">
                <input
                  type="number"
                  style={{ appearance: 'textfield' }}
                  value={quickBuyAmount}
                  onChange={(e) => setQuickBuyAmount(e.target.value)}
                  className="w-32 bg-background-secondary text-foreground placeholder-foreground-tertiary rounded-lg pl-9 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <img
                  src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                  alt="SOL"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground-secondary">
                  SOL
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-foreground-secondary">Presets</span>
              {['S1', 'S2', 'S3'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedPreset === preset
                      ? 'bg-accent-blue text-white'
                      : 'bg-background-secondary text-foreground-secondary hover:bg-background-tertiary'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Token Lists */}
      <div className="grid grid-cols-3 gap-4">
        {/* Newly Created */}
        <div className="bg-background-secondary rounded-lg p-4 flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">NEWLY CREATED</h2>
            <button 
              onClick={() => toggleFilters('newly-created')}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition-colors ${
                categoryStates['newly-created'].showFilters 
                  ? 'bg-accent-blue text-white' 
                  : 'bg-background-tertiary hover:bg-background text-foreground-secondary'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter 3
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {categoryStates['newly-created'].showFilters ? (
              <FilterPanel 
                category="newly-created"
                filters={categoryStates['newly-created'].filters}
                onUpdateFilters={(field, value) => updateFilters('newly-created', field, value)}
              />
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 mt-2">
                {sampleTokens.map((token) => (
                  <TokenCard key={token.address} token={token} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* About to Graduate */}
        <div className="bg-background-secondary rounded-lg p-4 flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">ABOUT TO GRADUATE</h2>
            <button 
              onClick={() => toggleFilters('about-to-graduate')}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition-colors ${
                categoryStates['about-to-graduate'].showFilters 
                  ? 'bg-accent-blue text-white' 
                  : 'bg-background-tertiary hover:bg-background text-foreground-secondary'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter 3
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {categoryStates['about-to-graduate'].showFilters ? (
              <FilterPanel 
                category="about-to-graduate"
                filters={categoryStates['about-to-graduate'].filters}
                onUpdateFilters={(field, value) => updateFilters('about-to-graduate', field, value)}
              />
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 mt-2">
                {graduatingTokens.map((token) => (
                  <TokenCard key={token.address} token={token} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Graduated */}
        <div className="bg-background-secondary rounded-lg p-4 flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">GRADUATED</h2>
            <button 
              onClick={() => toggleFilters('graduated')}
              className={`flex items-center gap-1 text-sm px-2 py-1 rounded transition-colors ${
                categoryStates['graduated'].showFilters 
                  ? 'bg-accent-blue text-white' 
                  : 'bg-background-tertiary hover:bg-background text-foreground-secondary'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filter 3
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {categoryStates['graduated'].showFilters ? (
              <FilterPanel 
                category="graduated"
                filters={categoryStates['graduated'].filters}
                onUpdateFilters={(field, value) => updateFilters('graduated', field, value)}
              />
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 mt-2">
                {graduatedTokens.map((token) => (
                  <TokenCard key={token.address} token={token} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeScope;