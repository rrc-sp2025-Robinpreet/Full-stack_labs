import { getDepartments } from "../../../repositories/employeeRepo";
import type { FormEvent } from "react";
import { useFormInput } from "../../../hooks/useFormInput";
import {
    addEmployee,
    validateEmployee
} from "../../../services/employeeService";

type EmployeeFormProps = {
    onEmployeeAdded: () => void;
};

export function EmployeeForm({ onEmployeeAdded }: EmployeeFormProps) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const department = useFormInput();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateEmployee(
            firstName.value,
            department.value,
            getDepartments()
        );

        const firstNameValid = firstName.validate(
            () => errors.filter(error => error.includes("First name"))
        );

        const departmentValid = department.validate(
            () => errors.filter(error => error.includes("department"))
        );

        if (!firstNameValid || !departmentValid) {
            return;
        }

        try {
            addEmployee(
                firstName.value,
                lastName.value,
                department.value
            );

            firstName.reset();
            lastName.reset();
            department.reset();

            onEmployeeAdded();
        } catch (error) {
            department.validate(() => [
                error instanceof Error
                    ? error.message
                    : "Unable to add employee."
            ]);
        }
    };

    return (
        <section>
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        value={firstName.value}
                        onChange={e => firstName.setValue(e.target.value)}
                    />
                    {firstName.messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        value={lastName.value}
                        onChange={e => lastName.setValue(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="department">Department:</label>
                    <select
                        id="department"
                        value={department.value}
                        onChange={e => department.setValue(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {getDepartments().map(d => (
                            <option key={d.name} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                    {department.messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>

                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}
