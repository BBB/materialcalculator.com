import { memoize } from 'lodash';

const multiply = (a, b) => ((a * 10000) * (b * 10000)) / 10000;
const divide = (a, b) => ((a * 10000) / (b * 10000)) / 10000;

const MILLIMETER = 'MILLIMETER';
const LENGTH = 'LENGTH';

const UNIT_DEF = {
  FOOT: {
    name: 'Foot',
    alias: ['ft', '\''],
    type: LENGTH,
    value: 304.8,
    units: MILLIMETER,
  },
  INCH: {
    name: 'Inch',
    alias: ['in', '"'],
    type: LENGTH,
    value: 25.4,
    units: MILLIMETER,
  },
  METER: {
    name: 'Meter',
    alias: ['m'],
    type: LENGTH,
    value: 1000,
    units: MILLIMETER,
  },
  CENTIMETER: {
    name: 'Centimeter',
    alias: ['cm'],
    type: LENGTH,
    value: 10,
    units: MILLIMETER,
  },
  [MILLIMETER]: {
    name: 'Millimeter',
    alias: ['mm'],
    type: LENGTH,
    value: 1,
    units: MILLIMETER,
  },
};

const UNIT_ALIASES = Object.keys(UNIT_DEF).reduce((ret, unit) => {
  const val = UNIT_DEF[unit];
  ret[val.name] = val.alias.length > 0 ? val.alias[0] : val.name;
  return ret;
}, {});

const getUnitDef = (name) => {
  const unit = Object.values(UNIT_DEF).find((d) => d.name === name);
  if (!unit) {
    throw new Error(`Can't find unit with name ${name}`);
  }
  return unit;
};
const getUnitByAlias = (alias) => Object.values(UNIT_DEF).filter((d) => d.alias.indexOf(alias) > -1);

const convertToBaseUnits = (startValue, startUnit) => {
  return {
    amount: multiply(startUnit.value, startValue),
    unit: UNIT_DEF[startUnit.units].name,
  };
};

const convertTo = memoize((startUnit, endUnit, startValue) => {
  const baseUnits = convertToBaseUnits(startValue, startUnit);
  if (startUnit.type === endUnit.type) {
    if (endUnit.key === startUnit.units) {
      return baseUnits;
    }
    return {
      unit: endUnit.name,
      amount: divide(baseUnits.amount, endUnit.value),
    };
  }
}, (startUnit, endUnit, startValue) => `${startUnit.name}${endUnit.name}${startValue}`);

const convertAmount = memoize((amount, endUnit) => {
  const endUnitDef = getUnitDef(endUnit);
  let conv = amount;
  if (amount.unit !== endUnit) {
    conv = convertTo(getUnitDef(amount.unit), endUnitDef, amount.amount);
  }
  return conv;
}, (amount, endUnit) => `${amount.amount}${amount.unit}${endUnit}`);

const fractionToDecimal = (value) => {
  if (!/\//.test(value)) {
    return Number(value);
  }
  let singleValue = 0;
  if (/\d+\s\d+/.test(value)) {
    singleValue = Number(value.replace(/(\d+)\s?\/\s?(\d+)/, ''));
  }
  const matches = value.match(/(\d+)\s?\/\s?(\d+)/);
  const [ _, numerator, denominator ] = matches; // eslint-disable-line no-unused-vars
  return singleValue + (numerator / denominator);
};

export {
  UNIT_DEF,
  UNIT_ALIASES,
  getUnitDef,
  getUnitByAlias,
  convertAmount,
  convertToBaseUnits,
  fractionToDecimal,
};
