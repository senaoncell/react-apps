import { useState } from "react";

export default function useInput(initialValue, validationFn) {
    const [value, setValue] = useState(initialValue); 
    const [isEdited, setIsEdited] = useState(false);

    const IsValid = validationFn(value);

    //For the onBlur event: It is triggered when the user exits the input field (loses focus)
    function handleInputBlur() {
        setIsEdited(true); // Error checking is now active (errors will be shown if any exist)
    }

    //For the onChange event: It is triggered as the user types. It updates the new value with setValue.
    function handleInputChange(e) {
        setValue(e.target.value);
        setIsEdited(false); //It temporarily resets the error check because the editing process is ongoing.
    }

    return {
        value,
        handleInputChange,
        handleInputBlur,
        hasError: isEdited && !IsValid //if it is edited AND invalid
    }
}