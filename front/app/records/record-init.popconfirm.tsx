import { Button, DatePicker, Form, Input, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import { Settings2 } from "lucide-react";
import { Document } from "@/models/record"

const RecordInitPopconfirm = ({initialValues, save}:{initialValues: Document, save: Function}) => {
    const [form] = useForm();

    const description = (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={initialValues}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
        >
            <Form.Item label="Year" name="date">
                <DatePicker picker="year" />
            </Form.Item>
            <Form.Item label="Location" name="location">
                <Input />
            </Form.Item>
            <Form.Item label="Archive" name="archive">
                <Input />
            </Form.Item>
            <Form.Item label="Fond" name="fond">
                <Input />
            </Form.Item>
            <Form.Item label="Inventory" name="inventory">
                <Input />
            </Form.Item>
            <Form.Item label="File" name="file">
                <Input />
            </Form.Item>
            {/* <Form.Item label="Page" name="page">
                <Input />
            </Form.Item> */}
        </Form>
    );

    const handleFormConfirm = () => {
        save(form.getFieldsValue())
    }

    return (
        <Popconfirm
            title="Set default information for new records"
            description={description}
            style={{right: 20}}
            icon={null}
            okText="Ok"
            onConfirm={handleFormConfirm}
            showCancel={false}
        >
            <Button shape="circle" icon={<Settings2 size={16}/>}/>
        </Popconfirm>
    )
}

export default RecordInitPopconfirm;