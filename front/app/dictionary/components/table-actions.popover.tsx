import { Button, Flex, Popover, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditLastNameModal from './lastnames/edit-lastname.modal';
import EditFirstNameModal from '@/app/dictionary/components/firstnames/edit-firstname.modal';
// import EditLastNameModal from '../modals/edit-lastname.modal';

type TableActionsPopoverProps = {
    type: 'lastnames' | 'firstnames',
    data:any,
    editFn: Function,
    deleteFn: Function
}

const TableActionsPopover = ({type, data, editFn, deleteFn}: TableActionsPopoverProps) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditClick = () => {
        setEditOpen(true);
    }

    const handleDeleteClick = () => {
        deleteFn(data._id);
    }

    const content = (
        <Flex wrap gap="small">
            <Tooltip title="edit">
                <Button shape="circle" icon={<EditOutlined />} onClick={handleEditClick}/>
            </Tooltip>
            <Tooltip title="delete">
                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDeleteClick}/>
            </Tooltip>
        </Flex>
    );

    const editionModal = () => {
        switch(type){
            case 'lastnames':
                return <EditLastNameModal initialData={data} edit={editFn} open={editOpen} close={() => setEditOpen(false)} />;
            case 'firstnames':
                return <EditFirstNameModal initialData={data} edit={editFn} open={editOpen} close={() => setEditOpen(false)} />;
        }
    }

    return (
        <>
            <Popover content={content} key={data}>
                <Button shape="circle" key={data} icon={<MoreOutlined />}/>
            </Popover>
            {editionModal()}
        </>
    );
}

export default TableActionsPopover;