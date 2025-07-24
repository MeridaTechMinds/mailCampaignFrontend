export const makeFormObj = (data, parentKey = "", formData = new FormData()) => {
    console.log(data, 'from making');

    Object.keys(data).forEach((key) => {
        const value = data[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key; // Handle nested keys

        if (value instanceof File) {
            formData.append(formKey, value); // Append File directly
        } else if (Array.isArray(value)) {
            value.forEach((val, index) => {
                // Append arrays with proper keys
                const arrayKey = `${formKey}`;
                if (typeof val === "object" && !(val instanceof File)) {
                    formData.append(arrayKey, JSON.stringify(val)) // Recursively handle arrays of objects
                } else {
                    formData.append(arrayKey, val);
                }
            });
        } else if (typeof value === "object" && value !== null) {
            // Recursively handle nested objects
            makeFormObj(value, formKey, formData);
        } else {
            formData.append(formKey, value); // Append primitive values
        }
    });

    return formData;
};



export const makeReadableTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    if (isToday) {
        return timeString;
    } else if (isYesterday) {
        return `Yesterday ${timeString}`;
    } else {
        const datePart = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit'
        }); // e.g., "Jul 4, 25"
        return `${datePart} ${timeString}`;
    }
}
export function formatToISTReadable(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',       // Saturday
        year: 'numeric',       // 2025
        month: 'long',         // July
        day: 'numeric',        // 19
        hour: '2-digit',       // 12
        minute: '2-digit',     // 17
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'  // IST
    };
    return date.toLocaleString('en-IN', options);
}

export const fromAddressformat = (from, index) => {
    const match = from?.match(/"?([^"]*)"?\s*<([^>]+)>/);
    return match?.[index]
}