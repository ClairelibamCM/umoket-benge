import React, { useState } from 'react';
import { ChevronDown, DollarSign } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext.jsx';

const CurrencySelector = () => {
  const { currency, setCurrency, availableCurrencies, exchangeRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencyInfo = {
    FCFA: {
      name: 'Franc CFA',
      flag: '🇨🇫',
      symbol: 'FCFA',
      description: 'Devise principale'
    },
    EUR: {
      name: 'Euro',
      flag: '🇪🇺',
      symbol: '€',
      description: 'Monnaie européenne'
    },
    USD: {
      name: 'Dollar US',
      flag: '🇺🇸',
      symbol: '$',
      description: 'Monnaie internationale'
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <DollarSign className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currencyInfo[currency].flag} {currencyInfo[currency].symbol}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                Choisir une devise
              </div>
              
              {availableCurrencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    currency === curr 
                      ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{currencyInfo[curr].flag}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{currencyInfo[curr].name}</div>
                      <div className="text-xs text-gray-500">{currencyInfo[curr].description}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-sm">{currencyInfo[curr].symbol}</div>
                    {curr !== 'FCFA' && (
                      <div className="text-xs text-gray-500">
                        1 FCFA = {exchangeRates[curr].toFixed(4)} {currencyInfo[curr].symbol}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Footer avec info */}
            <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 rounded-b-lg">
              <div className="text-xs text-gray-500 text-center">
                Taux de change mis à jour quotidiennement
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrencySelector;

