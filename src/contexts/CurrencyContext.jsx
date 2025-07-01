import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Taux de change (mis à jour régulièrement)
const EXCHANGE_RATES = {
  FCFA: 1,
  EUR: 0.00152, // 1 FCFA = 0.00152 EUR
  USD: 0.00163  // 1 FCFA = 0.00163 USD
};

// Symboles des devises
const CURRENCY_SYMBOLS = {
  FCFA: 'FCFA',
  EUR: '€',
  USD: '$'
};

// Formatage des nombres selon la devise
const formatCurrency = (amount, currency) => {
  const convertedAmount = amount * EXCHANGE_RATES[currency];
  
  switch (currency) {
    case 'FCFA':
      return `${Math.round(convertedAmount).toLocaleString()} FCFA`;
    case 'EUR':
      return `${convertedAmount.toFixed(2)} €`;
    case 'USD':
      return `$${convertedAmount.toFixed(2)}`;
    default:
      return `${Math.round(convertedAmount).toLocaleString()} FCFA`;
  }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('FCFA');

  // Charger la devise sauvegardée au démarrage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('umoket-currency');
    if (savedCurrency && ['FCFA', 'EUR', 'USD'].includes(savedCurrency)) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Sauvegarder la devise quand elle change
  useEffect(() => {
    localStorage.setItem('umoket-currency', currency);
  }, [currency]);

  const convertAmount = (amount, fromCurrency = 'FCFA') => {
    // Convertir d'abord en FCFA si nécessaire
    const amountInFCFA = fromCurrency === 'FCFA' ? amount : amount / EXCHANGE_RATES[fromCurrency];
    // Puis convertir vers la devise cible
    return amountInFCFA * EXCHANGE_RATES[currency];
  };

  const formatAmount = (amount, fromCurrency = 'FCFA') => {
    const convertedAmount = convertAmount(amount, fromCurrency);
    return formatCurrency(convertedAmount / EXCHANGE_RATES[currency], currency);
  };

  const getCurrencySymbol = () => {
    return CURRENCY_SYMBOLS[currency];
  };

  const getExchangeRate = () => {
    return EXCHANGE_RATES[currency];
  };

  const value = {
    currency,
    setCurrency,
    convertAmount,
    formatAmount,
    getCurrencySymbol,
    getExchangeRate,
    availableCurrencies: ['FCFA', 'EUR', 'USD'],
    exchangeRates: EXCHANGE_RATES
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

