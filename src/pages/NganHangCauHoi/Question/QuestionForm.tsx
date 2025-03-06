import { Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';

const { Option } = Select;

const QuestionForm = ({ getDataQuestions, setVisible, isEdit, row, onSave }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		if (isEdit && row) {
			form.setFieldsValue(row);
		} else {
			form.resetFields();
		}
	}, [isEdit, row, form]);

	const handleSubmit = (values) => {
		const newQuestion = { id: isEdit ? row.id : Date.now(), ...values };
		onSave(newQuestion);
		setVisible(false);
		getDataQuestions();
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleSubmit}>
			<Form.Item name='id' label='ID Câu Hỏi' hidden>
				<Input />
			</Form.Item>
			<Form.Item name='subject' label='Subject' rules={[{ required: true, message: 'Please enter subject' }]}>
				<Input />
			</Form.Item>
			<Form.Item name='content' label='Content' rules={[{ required: true, message: 'Please enter question content' }]}>
				<Input.TextArea rows={3} />
			</Form.Item>
			<Form.Item name='difficulty' label='Difficulty' rules={[{ required: true, message: 'Please select difficulty level' }]}>
				<Select>
					<Option value='Easy'>Dễ </Option>
					<Option value='Medium'>trung Bình </Option>
					<Option value='Hard'>Khó </Option>
					<Option value='Very Hard'>Rất Khó </Option>
				</Select>
			</Form.Item>
			<Form.Item name='knowledgeArea' label='Knowledge Area' rules={[{ required: true, message: 'Please enter knowledge area' }]}>
				<Input />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit'>
					{isEdit ? 'Update' : 'Add'} Câu Hỏi 
				</Button>
				<Button style={{ marginLeft: 10 }} onClick={() => setVisible(false)}>
					Thoát 
				</Button>
			</Form.Item>
		</Form>
	);
};

export default QuestionForm;
