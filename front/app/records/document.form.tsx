import { Col, Form, Input, Row } from "antd";

const DocumentForm = () => (
    <Form.Item>
        <Row gutter={8}>
            <Col span={12}>
                <Form.Item name="location" key="location" rules={[{ required: true }]}>
                    <Input placeholder="Location" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="archive" key="archive" rules={[{ required: true }]}>
                    <Input placeholder="Archive"/>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={8}>
            <Col span={12}>
                <Form.Item name="fond" key="fond" rules={[{ required: true }]}>
                    <Input placeholder="Fond"/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="inventory" key="inventory" rules={[{ required: true }]}>
                    <Input placeholder="Inventory"/>
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={8}>
            <Col span={12}>
                <Form.Item name="file" key="file" rules={[{ required: true }]}>
                    <Input placeholder="File"/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="page" key="page" rules={[{ required: true }]}>
                    <Input placeholder="Page" type="number"/>
                </Form.Item>
            </Col>
        </Row>
        <Form.Item name="link" key="link" rules={[{ required: true }]}>
            <Input placeholder="Link"/>
        </Form.Item>
    </Form.Item>
);

export default DocumentForm;