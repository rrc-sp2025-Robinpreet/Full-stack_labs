
import { useState } from "react";
import type { FormEvent } from "react";

export function useFormSubmit(
    submitCallback: () => boolean,
    onSuccess?: () => void
) {
    const [error, setError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        try {
            const success = submitCallback();

            if (success) {
                onSuccess?.();
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to submit the form."
            );
        }
    };

    return {
        handleSubmit,
        error
    };
}
