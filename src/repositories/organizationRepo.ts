
import { roleData } from "../data/roles";
import type { Role } from "../types/role";
import type { Employee } from "../types/employee";

let roles: Role[] = structuredClone(roleData);

// READ: Get all organization roles
export function getRoles(): Role[] {
    return structuredClone(roles);
}

// READ: Find a role by its unique ID
export function getRoleById(id: string): Role | undefined {
    const role = roles.find(r => r.id === id);
    return role ? structuredClone(role) : undefined;
}

// CREATE: Add a new organization role
export function createRole(role: Role): Role {
    if (roles.some(r => r.id === role.id)) {
        throw new Error("A role with this ID already exists.");
    }

    roles.push(structuredClone(role));
    return structuredClone(role);
}

// UPDATE: Assign an employee to an existing vacant role
export function assignEmployeeToRole(
    roleId: string,
    employee: Employee
): Role {
    const role = roles.find(r => r.id === roleId);

    if (!role) {
        throw new Error("Role not found.");
    }

    if (role.employee) {
        throw new Error("This role is already occupied.");
    }

    role.employee = structuredClone(employee);
    return structuredClone(role);
}

// DELETE: Remove a role
export function deleteRole(roleId: string): boolean {
    const originalLength = roles.length;
    roles = roles.filter(r => r.id !== roleId);

    return roles.length < originalLength;
}
