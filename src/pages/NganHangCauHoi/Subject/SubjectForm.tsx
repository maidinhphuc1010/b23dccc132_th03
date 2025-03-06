import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';

const SubjectForm = ({ getDataSubjects, setVisible, isEdit, row, onSave }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(row || { code: '', name: '', credits: '' });
	}, [row, form]);

	const handleSubmit = (values) => {
		console.log('🚀 ~ SubjectForm ~ values:', values);
		onSave(values);
		setVisible(false);
		getDataSubjects();
	};

	return (
		<Form form={form} onFinish={handleSubmit}>
			<Form.Item
				label='Course Code'
				name='code'
				rules={[{ required: true, message: 'Please input course code!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Course Name'
				name='name'
				rules={[{ required: true, message: 'Please input course name!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Credits'
				name='credits'
				rules={[{ required: true, message: 'Please input number of credits!' }]}
			>
				<Input type='number' />
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Save' : 'Insert'}
				</Button>
				<Button onClick={() => setVisible(false)}>Cancel</Button>
			</div>
		</Form>
	);
};

export default SubjectForm;
