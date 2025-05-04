import { Button, Flex, Popover, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';

const TableActionsPopover = ({open}: {open: boolean}) => {
    const content = (
        <Flex wrap gap="small">
            <Tooltip title="delete">
                <Button shape="circle" icon={<EditOutlined />} />
            </Tooltip>
            <Tooltip title="delete">
                <Button shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
        </Flex>
    );

    return (
        <Popover content={content} title="Title">
            <Button shape="circle" icon={<MoreOutlined />}/>
        </Popover>
    );
}

export default TableActionsPopover;