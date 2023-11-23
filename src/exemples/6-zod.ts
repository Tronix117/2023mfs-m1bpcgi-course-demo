/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';

const messageSchema = z.object({
  text: z.string(),
  userId: z.string(),
});

type ExcpectedMessage = z.infer<typeof messageSchema>;

// POST /messages
// { text, userId }
export function handleRequest(payload: unknown) {
  const messagePayload = messageSchema.parse(payload);

  console.log(messagePayload.text.toLowerCase());
}

// --- simuler l'appel de cette route
// cad comme si je faisais un POST /messages

handleRequest({ text: 'sdfjkhds', userId: 'sdilfjdsflkj' } as any);
handleRequest({ toto: 34 } as any);
