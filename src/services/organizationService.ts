import { Guid } from "guid-typescript";
import {
    getRoles,
    createRole,
    assignEmployeeToRole
} from "../repositories/organizationRepo";

export function validateOrganizationEmployee(
    firstName: string,
    roleTitle: string
): string[] {
    const errors: string[] = [];

    if (firstName.trim().length < 3) {
        errors.push("First name must be at least 3 characters.");
    }

    if (!roleTitle.trim()) {
        errors.push("Role is required.");
    } else {
        const matchingRoles = getRoles().filter(
            r => r.title.toLowerCase() === roleTitle.trim().toLowerCase()
        );

        if (
            matchingRoles.length > 0 &&
            matchingRoles.every(r => r.employee !== undefined)
        ) {
            errors.push("This role is already occupied.");
        }
    }

    return errors;
}

export function addOrganizationEmployee(
    firstName: string,
    lastName: string,
    roleTitle: string
): void {
    const errors = validateOrganizationEmployee(firstName, roleTitle);

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    const employee = {
        id: Guid.create().toString(),
        firstName: firstName.trim(),
        lastName: lastName.trim()
    };

    const title = roleTitle.trim();

    const vacantRole = getRoles().find(
        r => r.title.toLowerCase() === title.toLowerCase()
            && !r.employee
    );

    if (vacantRole) {
        assignEmployeeToRole(vacantRole.id, employee);
    } else {
        createRole({
            id: Guid.create().toString(),
            title,
            employee
        });
    }
}
