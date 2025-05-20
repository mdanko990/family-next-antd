const capitalize = (text: string) => {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

export default capitalize;
