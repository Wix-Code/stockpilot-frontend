"use client";

import { useMemo, useState } from "react";

import { users as initialUsers } from "@/components/user/MockData";

import { FormDialog } from "@/components/reuseable/FormDialog";

import { DetailsSheet } from "@/components/reuseable/DetailsSheet";
import { BusinessUser, UserRole } from "@/components/user/UserTypes";
import { UsersHeader } from "@/components/user/UsersHeader";
import { UserStats } from "@/components/user/UsersStats";
import { UserToolbar } from "@/components/user/UsersToolbar";
import { UserTable } from "@/components/user/UserSTable";
import { UserForm } from "@/components/user/UserForm";
import { UserDetails } from "@/components/user/UserDetails";

export default function UsersPage() {
  const [users, setUsers] = useState<BusinessUser[]>(initialUsers);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("all");

  const [status, setStatus] = useState("all");

  const [selectedUser, setSelectedUser] = useState<BusinessUser | null>(null);

  const [editingUser, setEditingUser] = useState<BusinessUser | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term);

      const matchesRole = role === "all" || user.role === role;

      const matchesStatus = status === "all" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  function openUser(user: BusinessUser) {
    setSelectedUser(user);

    setDetailsOpen(true);
  }

  function editUser(user: BusinessUser) {
    setDetailsOpen(false);

    setEditingUser(user);

    setFormOpen(true);
  }

  function suspendUser(user: BusinessUser) {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: "suspended",
            }
          : item,
      ),
    );

    setDetailsOpen(false);
  }

  function saveUser(values: { name: string; email: string; role: UserRole }) {
    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: values.name,
                role: values.role,
              }
            : user,
        ),
      );
    } else {
      const newUser: BusinessUser = {
        id: crypto.randomUUID(),

        name: values.name,

        email: values.email,

        role: values.role,

        status: "pending",

        invitedAt: new Date().toISOString(),
      };

      setUsers((current) => [newUser, ...current]);
    }

    setFormOpen(false);

    setEditingUser(null);
  }

  return (
    <>
      <UsersHeader
        onInvite={() => {
          setEditingUser(null);

          setFormOpen(true);
        }}
      />

      <UserStats users={users} />

      <UserToolbar
        search={search}
        onSearchChange={setSearch}
        role={role}
        onRoleChange={setRole}
        status={status}
        onStatusChange={setStatus}
      />

      <UserTable
        users={filteredUsers}
        onView={openUser}
        onEdit={editUser}
        onSuspend={suspendUser}
      />

      <FormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editingUser ? "Edit user access" : "Invite user"}
        description={
          editingUser
            ? "Update this user's role and workspace access."
            : "Invite a staff member to your StockPilot workspace."
        }
        size="md"
      >
        <UserForm
          user={editingUser}
          onSubmit={saveUser}
          onCancel={() => {
            setFormOpen(false);

            setEditingUser(null);
          }}
        />
      </FormDialog>

      <DetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title="User details"
        description="Review account status and workspace access."
        width="md"
      >
        {selectedUser && (
          <UserDetails
            user={
              users.find((user) => user.id === selectedUser.id) || selectedUser
            }
            onEdit={() => editUser(selectedUser)}
            onSuspend={() => suspendUser(selectedUser)}
          />
        )}
      </DetailsSheet>
    </>
  );
}
