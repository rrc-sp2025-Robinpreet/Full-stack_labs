
import departmentData from "../data/departments";
import type { Department } from "../types/department";
import type { Employee } from "../types/employee";

// Repository-managed temporary data storage
let departments: Department[] = structuredClone(departmentData);

// Retrieve all departments and their employees
export function getDepartments(): Department[] {
    return structuredClone(departments);
}

// Retrieve employees belonging to a department
export function getEmployeesByDepartment(
    departmentName: string
): Employee[] {
    const department = departments.find(
        d => d.name === departmentName
    );

    return structuredClone(department?.employees ?? []);
}

// Create a new employee in the selected department
export function createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
): Employee {
    const department = departments.find(
        d => d.name === departmentName
    );

    if (!department) {
        throw new Error("Department does not exist.");
    }

    const employee: Employee = {
        firstName: firstName.trim(),
        lastName: lastName.trim()
    };

    department.employees.push(employee);

    return structuredClone(employee);
}
