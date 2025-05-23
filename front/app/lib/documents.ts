import { Document } from "@/models/record";
import { notification } from "antd";
import { RecordRole } from "../records/record-birth.config";

const url = 'http://localhost:5000/documents';

export const getAllDocuments = async () => {
    return await fetch(url).then(response => response.json());
}

export const createDocument = async (document: Document, main: RecordRole[]) => {
    return await fetch(`${url}?main=["${main}"]`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
    })
    .then(response => response.json())
    .then(() => {
        notification.success({
            message: 'Document was added',
        });
    })
    .catch((error) => {
        notification.error({
            message: 'Document creation failed',
            description: error
        });
    });
}