import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';

const ExamStructure = () => {
  const [structure, setStructure] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setStructure([...structure, values]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Number of Questions',
      dataIndex: 'numQuestions',
      key: 'numQuestions',
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Section
      </Button>
      <Table dataSource={structure} columns={columns} rowKey="section" />
      <Modal title="Add Section" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="section" label="Section" rules={[{ required: true, message: 'Please input the section name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="numQuestions" label="Number of Questions" rules={[{ required: true, message: 'Please input the number of questions!' }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExamStructure;
