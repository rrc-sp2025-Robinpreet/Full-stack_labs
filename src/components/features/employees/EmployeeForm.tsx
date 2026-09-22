import { useState } from "react";
import type { Department } from "../../../types/department";

type EmployeeFormProps = {
    departments: Department[];
    onAddEmployee: (
        firstName: string,
        lastName: string,
        department: string
    ) => void;
};

export function EmployeeForm({
    departments,
    onAddEmployee
}: EmployeeFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear old validation messages
        const validationErrors: string[] = [];

        // Validate first name
        if (firstName.trim().length < 3) {
            validationErrors.push(
                "First name must be at least 3 characters."
            );
        }

        // Validate department
        const departmentExists = departments.some(
            d => d.name === department
        );

        if (!departmentExists) {
            validationErrors.push(
                "Please select a valid department."
            );
        }

        // Stop if validation failed
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear validation messages
        setErrors([]);

        // Add employee
        onAddEmployee(
            firstName.trim(),
            lastName.trim(),
            department
        );

        // Clear form
        setFirstName("");
        setLastName("");
        setDepartment("");
    };

    return (
        <section>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="firstName">
                        First Name:
                    </label>

                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="lastName">
                        Last Name:
                    </label>

                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="department">
                        Department:
                    </label>

                    <select
                        id="department"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map(d => (
                            <option
                                key={d.name}
                                value={d.name}
                            >
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.length > 0 && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                {error}
                            </li>
                        ))}
                    </ul>
                )}

                <button type="submit">
                    Add Employee
                </button>

            </form>
        </section>
    );
}