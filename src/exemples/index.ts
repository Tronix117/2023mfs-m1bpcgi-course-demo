import chalk from 'chalk';

import './basic.js';

console.log(chalk.blue('teffst'));

type NumberOrNull = number | null;

/**
 *
 */
export function divide(a: number, b: number): NumberOrNull {
  if (b === 0) return null;

  return a / b;
}

console.log(divide(5, 34));
