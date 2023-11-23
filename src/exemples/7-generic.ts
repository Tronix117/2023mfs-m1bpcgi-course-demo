/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

export function transformToArray<T>(parameter: T): T[] {
  return [parameter];
}

const a = transformToArray(45);

// -----

type ToArray<T> = T[];

const c = 'toto';

let b: ToArray<typeof c> | null;

interface Article {
  content: string;
  image: string;
  userId: string;
  createdAt: string;
}

type ArticlePatchData = Partial<Omit<Article, 'userId' | 'createdAt'>>;

type PartialLike<T> = T extends Array<infer U>
  ? U[]
  : T extends Object
  ? { [K in keyof T]?: T[K] }
  : never;

type Article2PatchData = PartialLike<Omit<Article, 'userId' | 'createdAt'>>;

const obj: Record<string, number> = {};

obj['sldgkjhdfkg'] = '45';
