/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

// type
type UserType = {
  id: number;
  pseudo: string;
  age: number;
  isAdmin: boolean;
} | null;

// OU interface
interface UserInterface {
  id: number;
  pseudo: string;
  age: number;
  isAdmin: boolean;
}

interface UserAdminInterface extends UserInterface {
  roles: string[];
}

type UserOrNull = UserInterface | UserAdminInterface | null;

const users: UserInterface[] = [];

users.push({
  id: 1,
  pseudo: 'Jeremy',
  age: 3,
  isAdmin: true,
});
