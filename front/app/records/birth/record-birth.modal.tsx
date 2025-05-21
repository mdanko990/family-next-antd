import { Button, message, Modal } from "antd";
import { Cake } from "lucide-react";
import { useState } from "react";
import { Document } from "@/models/record";
import { FirstName, LastName } from "@/models/name";
import { Status } from "@/models/status";
import { Type } from "@/models/type";
import { Role } from "@/models/role";
import RecordBirthForm from "./record-birth.form";
import { createDocument } from "@/app/lib/documents";

export interface RecordBirthModalProps {
    type: Type | null,
    initialDocument: Document,
    firstnames: { male: FirstName[]; female: FirstName[]; },
    lastnames: LastName[],
    statuses: Status[],
    roles: Role[]
}

const RecordBirthModal = ({type, initialDocument, firstnames, lastnames, statuses, roles}:RecordBirthModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };
  
    const handleSave = (value: Document) => {
        createDocument({...value, type}, ['child'])
        .then(() => {
          messageApi.success("Document and records were stored");
          setIsModalOpen(false);
        })
        .catch(() => {
          messageApi.error("Document creation failed");
        })
    };
  
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
      <>
        <Button shape="circle" icon={<Cake size={16} />} onClick={showModal}/>
        <Modal
          closable={false}
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          destroyOnClose
        >
            <RecordBirthForm initialDocument={initialDocument} save={handleSave} data={{firstnames, lastnames, statuses, roles,}} />
        </Modal>
      </>
    );
  }

export default RecordBirthModal;