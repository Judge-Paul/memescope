import React from 'react';
import type { CategoryFilters } from '../types/filters';

interface FilterPanelProps {
  category: 'newly-created' | 'about-to-graduate' | 'graduated';
  filters: CategoryFilters;
  onUpdateFilters: (field: keyof CategoryFilters | string, value: string | { min: string; max: string }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ category, filters, onUpdateFilters }) => (
  <div className="flex-1 overflow-y-auto">
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm text-foreground-secondary">Symbol/Name Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onUpdateFilters('search', e.target.value)}
          placeholder="Search by symbol or name..."
          className="w-full bg-background text-foreground placeholder-foreground-tertiary rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
        />
      </div>

      {[
        { key: 'pumpProgress', label: 'Pump Progress %' },
        { key: 'holders', label: 'Holders Count' },
        { key: 'devHolding', label: 'Dev Holding %' },
        { key: 'snipers', label: 'Snipers' },
        { key: 'botHolders', label: 'Bot Holders' },
        { key: 'age', label: 'Age (mins)' },
        { key: 'currentLiquidity', label: 'Current Liquidity' },
        { key: 'volume', label: 'Volume' },
        { key: 'marketCap', label: 'Market Cap' },
        { key: 'transactions', label: 'Transactions' },
        { key: 'buys', label: 'Buys' },
        { key: 'sells', label: 'Sells' }
      ].map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <label className="block text-sm text-foreground-secondary">{label}</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={filters[key].min}
              onChange={(e) => onUpdateFilters(key, {
                ...filters[key],
                min: e.target.value
              })}
              placeholder="Min"
              className="w-full bg-background text-foreground placeholder-foreground-tertiary rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
            <span className="text-foreground-secondary">to</span>
            <input
              type="text"
              value={filters[key].max}
              onChange={(e) => onUpdateFilters(key, {
                ...filters[key],
                max: e.target.value
              })}
              placeholder="Max"
              className="w-full bg-background text-foreground placeholder-foreground-tertiary rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FilterPanel;