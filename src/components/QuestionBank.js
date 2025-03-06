import React, { useState } from 'react';
import { Table, Button, Input, Modal, Form, Select } from 'antd';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setQuestions([...questions, values]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Question
      </Button>
      <Table dataSource={questions} columns={columns} rowKey="question" />
      <Modal title="Add Question" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="question" label="Question" rules={[{ required: true, message: 'Please input the question!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="difficulty" label="Difficulty" rules={[{ required: true, message: 'Please select the difficulty!' }]}>
            <Select>
              <Select.Option value="easy">Easy</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="hard">Hard</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionBank;
