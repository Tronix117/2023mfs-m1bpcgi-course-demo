/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

export class Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;

  constructor(
    id: Message['id'],
    text: Message['text'],
    userId: Message['text'],
    createdAt: Message['createdAt'],
  ) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
  }

  send() {
    //
  }

  protected _toJson() {
    //
  }
}

const message = new Message('kasjdhfdc', 'sadfkjhdsf', new Date());
