export const convertToBase64 = (fileInput: HTMLInputElement) => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<string>((resolve) => {
        reader.onload = () => {
            const base64String = reader.result
                ?.toString()
                .split(";base64,")?.[1];
            resolve(base64String ?? "");
        };
    });
};
