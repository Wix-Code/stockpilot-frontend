import { BusinessUser } from "./UserTypes";

export const users: BusinessUser[] = [
  {
    id: "usr-001",
    name: "Daniel Adeyemi",
    email: "daniel@stockpilot.ng",
    phone: "+234 803 455 8900",
    role: "owner",
    status: "active",
    lastActive: "2026-09-08T08:42:00",
    joinedAt: "2026-06-01T09:00:00",
  },

  {
    id: "usr-002",
    name: "Michael James",
    email: "michael@stockpilot.ng",
    phone: "+234 806 117 2880",
    role: "manager",
    status: "active",
    lastActive: "2026-09-08T07:20:00",
    joinedAt: "2026-06-05T09:00:00",
  },

  {
    id: "usr-003",
    name: "Grace Bello",
    email: "grace@stockpilot.ng",
    role: "cashier",
    status: "active",
    lastActive: "2026-09-08T09:11:00",
    joinedAt: "2026-06-08T09:00:00",
  },

  {
    id: "usr-004",
    name: "Emeka Obi",
    email: "emeka@stockpilot.ng",
    role: "inventory",
    status: "active",
    lastActive: "2026-09-07T16:40:00",
    joinedAt: "2026-06-11T09:00:00",
  },

  {
    id: "usr-005",
    name: "Sarah Yusuf",
    email: "sarah@example.com",
    role: "cashier",
    status: "pending",
    invitedAt: "2026-09-07T12:00:00",
  },
];
