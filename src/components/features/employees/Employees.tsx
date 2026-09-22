import { useState } from "react";
import departmentData from "../../../data/departments";
import styles from "./Employees.module.css";
import { EmployeeForm } from "./EmployeeForm";

export function Employees() {
    const [departments, setDepartments] = useState(departmentData);

    const addEmployee = (
        firstName: string,
        lastName: string,
        departmentName: string
    ) => {
        setDepartments(currentDepartments =>
            currentDepartments.map(department => {
                if (department.name === departmentName) {
                    return {
                        ...department,
                        employees: [
                            ...department.employees,
                            { firstName, lastName }
                        ]
                    };
                }

                return department;
            })
        );
    };

    const departmentListElement = departments.map(department => (
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
    ));

    return (
        <main>
            <section>
                <h1>Employees by Department</h1>
                {departmentListElement}
            </section>

            <EmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
            />
        </main>
    );
}