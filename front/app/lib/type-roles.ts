const url = 'http://localhost:5000/dictionary/type-roles';

export const getAllTypeRoles = async () => {
    return await fetch(url).then(response => response.json());
}
