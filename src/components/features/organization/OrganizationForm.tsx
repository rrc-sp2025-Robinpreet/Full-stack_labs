import { useFormInput } from "../../../hooks/useFormInput";
import { useFormSubmit } from "../../../hooks/useFormSubmit";
import {
    addOrganizationEmployee,
    validateOrganizationEmployee
} from "../../../services/organizationService";

interface OrganizationFormProps {
    onEmployeeAdded: () => void;
}

export function OrganizationForm({
    onEmployeeAdded
}: OrganizationFormProps) {
    const firstName = useFormInput();
    const lastName = useFormInput();
    const role = useFormInput();

    const submitOrganizationEmployee = (): boolean => {
        const errors = validateOrganizationEmployee(
            firstName.value,
            role.value
        );

        const isFirstNameValid = firstName.validate(
            () => errors.filter(message =>
                message.startsWith("First name")
            )
        );

        const isRoleValid = role.validate(
            () => errors.filter(message =>
                !message.startsWith("First name")
            )
        );

        if (!isFirstNameValid || !isRoleValid) {
            return false;
        }

        addOrganizationEmployee(
            firstName.value,
            lastName.value,
            role.value
        );

        firstName.reset();
        lastName.reset();
        role.reset();

        return true;
    };

    const { handleSubmit, error } = useFormSubmit(
        submitOrganizationEmployee,
        onEmployeeAdded
    );

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Organization Employee</h2>

            <div>
                <label htmlFor="org-first-name">First Name</label>
                <input
                    id="org-first-name"
                    type="text"
                    value={firstName.value}
                    onChange={event =>
                        firstName.setValue(event.target.value)
                    }
                />
                {firstName.messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>

            <div>
                <label htmlFor="org-last-name">Last Name</label>
                <input
                    id="org-last-name"
                    type="text"
                    value={lastName.value}
                    onChange={event =>
                        lastName.setValue(event.target.value)
                    }
                />
            </div>

            <div>
                <label htmlFor="org-role">Role</label>
                <input
                    id="org-role"
                    type="text"
                    value={role.value}
                    onChange={event =>
                        role.setValue(event.target.value)
                    }
                />
                {role.messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>

            {error && <p role="alert">{error}</p>}

            <button type="submit">Add Employee</button>
        </form>
    );
}
