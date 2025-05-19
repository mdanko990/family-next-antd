import { Button, message, Modal } from "antd";
import { Blend } from "lucide-react";
import { Document } from "@/models/record";
import { FirstName, LastName } from "@/models/name";
import { Status } from "@/models/status";
import { Type } from "@/models/type";
import { Role } from "@/models/role";
import RecordMarriageForm from "./record-marriage.form";
import { createDocument } from "@/app/lib/documents";
import { useState } from "react";

export interface RecordMarriageModalProps {
    type: Type | null,
    initialDocument: Document,
    firstnames: { male: FirstName[]; female: FirstName[]; },
    lastnames: LastName[],
    statuses: Status[],
    roles: Role[]
}

const RecordMarriageModal = ({type, initialDocument, firstnames, lastnames, statuses, roles}:RecordMarriageModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };
  
    const handleSave = (value: Document) => {
        createDocument({...value, type}, ['husband', 'wife'])
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
        <Button shape="circle" icon={<Blend size={16} />} onClick={showModal}/>
        <Modal
          closable={false}
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          destroyOnClose
        >
            <RecordMarriageForm initialDocument={initialDocument} save={handleSave} data={{firstnames, lastnames, statuses, roles,}} />
        </Modal>
      </>
    );
  }

export default RecordMarriageModal;