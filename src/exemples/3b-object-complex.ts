/* eslint-disable sonarjs/no-unused-collection */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

enum UserRole {
  CanReadArticles = 'CAN_READ_ARTICLES',
  CanManageArticles = 'CAN_MANAGE_ARTICLES',
}

interface CBaseUserInterface {
  id: number;
  pseudo: string;
  age?: number;
  isAdmin: boolean;
}

interface CUserInterface extends CBaseUserInterface {
  isAdmin: false;
}

interface CUserAdminInterface extends CBaseUserInterface {
  isAdmin: true;
  roles: UserRole[];
}

type CUserOrNull = CUserInterface | CUserAdminInterface | null;

const cUsers: CUserOrNull[] = [];

cUsers.push({
  id: 1,
  pseudo: 'Jeremy',
  age: 3,
  isAdmin: true,
  roles: [UserRole.CanManageArticles],
});

function hasAccess(user: CUserOrNull, role: UserRole): boolean {
  if (!user?.isAdmin) return false;

  return user.roles.includes(role);
}
