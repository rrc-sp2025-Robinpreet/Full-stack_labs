import departmentData from "../../../data/departments";
import styles from "./Employees.module.css";

export function Employees() {
    const departmentListElement = departmentData.map(d => {
        return <section>
            <h2>{d.name}</h2>
            <ul className={styles.employees}>
                {d.employees.map(e => <li>{e.firstName} {e.lastName}</li>)}
            </ul>
        </section>
    });

    return(
        <main>
            <section>
                <h1>Employees by Department</h1>
                {departmentListElement}
            </section>
        </main>
    )
}