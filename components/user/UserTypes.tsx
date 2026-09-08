export type UserRole = "owner" | "manager" | "cashier" | "inventory";

export type UserStatus = "active" | "pending" | "suspended";

export interface BusinessUser {
  id: string;

  name: string;
  email: string;
  phone?: string;

  role: UserRole;
  status: UserStatus;

  lastActive?: string;

  joinedAt?: string;
  invitedAt?: string;
}


export function getRoleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    owner: "Owner",
    manager: "Manager",
    cashier: "Cashier / Sales",
    inventory: "Inventory Staff",
  };

  return labels[role];
}