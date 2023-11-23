/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Position = [number, number] | null;

// Notation Generic
const users1: Array<string> = [];

// Notation traditionnelle
const users2: string[] = [];

// Tupple
let positionYnov: Position = null;

positionYnov = [4, 5];
positionYnov = null;

function centerToPosition(position: Position): boolean {
  if (!position) return false;

  console.log(position[0] / 2, position[1] / 2);

  return true;
}

const isCenterSuccessful = centerToPosition(positionYnov);
