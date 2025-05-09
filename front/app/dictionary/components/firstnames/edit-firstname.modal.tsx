import React from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import { LastName } from '@/models/name';
import { useForm } from 'antd/es/form/Form';

const EditFirstNameModal = ({initialData, edit, open, close}: {initialData: LastName, edit: Function, open: boolean, close: Function}) => {
    const [form] = useForm();

  const handleOk = () => {
    edit({...initialData, ...form.getFieldsValue()});
    close(false);
  };

  const handleCancel = () => {
    close(false);
  };

  return (
      <Modal
        closable={true}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='pt-8'>
            <Form
                form={form}
                initialValues={initialData}
                >              
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item name="name" required>
                            <Input autoFocus placeholder="Name" />
                        </Form.Item>
                    </Col>
                    {/* <Col span={12}>
                        <Form.Item name="female" required>
                            <Input placeholder="Female variation" />
                        </Form.Item>
                    </Col> */}
                </Row>
            </Form>
        </div>
    </Modal>
  );
};

export default EditFirstNameModal;