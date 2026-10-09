
import { useState } from "react";

export function useFormInput(initialValue = "") {
    const [value, setValue] = useState(initialValue);
    const [messages, setMessages] = useState<string[]>([]);

    const validate = (
        validationCallback: (value: string) => string[]
    ): boolean => {
        const validationMessages = validationCallback(value);

        setMessages(validationMessages);

        return validationMessages.length === 0;
    };

    const reset = () => {
        setValue(initialValue);
        setMessages([]);
    };

    return {
        value,
        setValue,
        messages,
        validate,
        reset
    };
}


