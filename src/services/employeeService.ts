
import type { Department } from "../types/department";
import type { Employee } from "../types/employee";
import {
    createEmployee,
    getDepartments
} from "../repositories/employeeRepo";

export function validateEmployee(
    firstName: string,
    departmentName: string,
    departments: Department[]
): string[] {
    const errors: string[] = [];

    if (firstName.trim().length < 3) {
        errors.push(
            "First name must be at least 3 characters."
        );
    }

    const departmentExists = departments.some(
        d => d.name === departmentName
    );

    if (!departmentExists) {
        errors.push(
            "Please select a valid department."
        );
    }

    return errors;
}

export function addEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
): Employee {
    const errors = validateEmployee(
        firstName,
        departmentName,
        getDepartments()
    );

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    return createEmployee(
        firstName,
        lastName,
        departmentName
    );
}

