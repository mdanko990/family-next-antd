import { FirsName } from "@/models/name";

const url = 'http://localhost:5000/dictionary/firstnames';

export const getAllFirstNames = async () => {
    return await fetch(url).then(response => response.json());
}

export const createFirstName = async (firstName: FirsName) => {
    return await fetch(url, {
        method: "POST",
        body: JSON.stringify(firstName)
    })
    .then(response => response.json());
}