// Utility functions
import { Platform } from 'react-native';
import R from 'ramda';
import moment from 'moment';
import numeral from 'numeral';

// useful cleaning functions
const nullToEmpty = R.defaultTo('');
const replaceEscapedCRLF = R.replace(/\\n/g);


export const formatDate = (date, year = false) => {
  const momentDate = moment.unix(date);
  // Show year only if its not the current one
  const showYear = momentDate.year() !== moment().year() || year;

  return momentDate.format(`D. M. ${showYear ? 'YYYY' : ''}`);
};

export const generateUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${
    s4()}-${s4()}${s4()}${s4()}`;
};

export const formatMoney = n =>
   `${numeral(n).format('0,0[.]00')} Kč`
;

export const mapCategoryToIcons = (category) => {
  switch (category.toLowerCase()) {
    case 'flat':
      return 'house';
    case 'fees':
      return 'creditcard';
    case 'food':
      return 'food';
    case 'clothes':
      return 'clothes';
    case 'traffic':
      return 'traffic';
    case 'vacation':
      return 'vacation';
    case 'pets':
      return 'animals';
    case 'others':
      return 'unknown';
    case 'internet':
      return 'wifi';
    case 'savings':
      return 'bank';
    default:
      return 'dollar';
  }
};

export const sums = (function () {
  const total = (t) => {
    if (!t.length) return 0;
    else if (t.length >= 1 && t.length < 2) {
      return t[0].amount;
    }

    return t.map(t => Number(t.amount))
      .reduce((a, b) => a + b);
  };

  const expense = t =>
    total(t.filter(t => t.type === 'EXPENSE'));

  const income = t =>
    total(t.filter(t => t.type === 'INCOME'));

  return (t) => {
    if (!t) {
      return { total: 0, expense: 0, income: 0 };
    }

    return {
      total: total(t),
      expense: expense(t),
      income: income(t),
    };
  };
}());
