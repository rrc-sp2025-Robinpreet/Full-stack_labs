
import { useState } from "react";
import { getRoles } from "../../../repositories/organizationRepo";
import type { Role } from "../../../types/role";
import { OrganizationForm } from "./OrganizationForm";
import styles from "../Features.module.css";

export function Organization() {
    const [roles, setRoles] = useState<Role[]>(() => getRoles());

    const refreshRoles = () => {
        setRoles(getRoles());
    };

    return (
        <section>
            <h1>Leadership and Management</h1>

            <OrganizationForm onEmployeeAdded={refreshRoles} />

            <table className={styles.table}>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td className={styles.roleName}>
                                {role.title}
                            </td>
                            <td>
                                {role.employee
                                    ? `${role.employee.firstName} ${role.employee.lastName ?? ""}`
                                    : "Vacant"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
