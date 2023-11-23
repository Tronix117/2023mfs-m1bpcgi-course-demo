/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

type ExcpectedMessage = { text: string; userId: string };

// Fonction discriminante
function isMessage(data: unknown): data is ExcpectedMessage {
  return !(
    typeof data !== 'object' ||
    data === null ||
    !('text' in data) ||
    typeof data.text !== 'string' ||
    !('userId' in data) ||
    typeof data.userId !== 'string'
  );
}

// POST /messages
// { text, userId }
export function handleRequest(payload: unknown) {
  if (!isMessage(payload)) {
    throw new Error('Bad request');
  }

  console.log(payload.text.toLowerCase());
}

// --- simuler l'appel de cette route
// cad comme si je faisais un POST /messages

handleRequest({ text: 'sdfjkhds', userId: 'sdilfjdsflkj' } as any);
handleRequest({ toto: 34 } as any);
