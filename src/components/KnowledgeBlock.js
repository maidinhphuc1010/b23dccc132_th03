import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form } from 'antd';

const KnowledgeBlock = () => {
  const [blocks, setBlocks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setBlocks([...blocks, values]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Knowledge Block',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Knowledge Block
      </Button>
      <Table dataSource={blocks} columns={columns} rowKey="name" />
      <Modal title="Add Knowledge Block" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name of the knowledge block!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KnowledgeBlock;
