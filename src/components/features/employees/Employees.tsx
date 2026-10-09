
import { useState } from "react";
import { getDepartments } from "../../../repositories/employeeRepo";
import { EmployeeForm } from "./EmployeeForm";
import styles from "./Employees.module.css";

export function Employees() {
    // Initialize display state using repository data
    const [departments, setDepartments] = useState(
        () => getDepartments()
    );

    // Refresh the displayed data after an employee is added
    const refreshEmployees = () => {
        setDepartments(getDepartments());
    };

    return (
        <main>
            <section>
                <h1>Employees by Department</h1>

                {departments.map(department => (
                    <section key={department.name}>
                        <h2>{department.name}</h2>

                        <ul className={styles.employees}>
                            {department.employees.map((employee, index) => (
                                <li key={index}>
                                    {employee.firstName} {employee.lastName}
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </section>

            <EmployeeForm onEmployeeAdded={refreshEmployees} />
        </main>
    );
}
