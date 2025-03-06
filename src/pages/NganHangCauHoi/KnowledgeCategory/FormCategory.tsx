import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';

const FormCategory = ({ getDataCategory, setVisible, isEdit, row, onSave }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(row || { name: '' });
	}, [row, form]);

	const handleSubmit = (values) => {
		console.log('🚀 ~ FormCategory ~ values:', values);
		onSave(values);
		setVisible(false);
		getDataCategory();
	};

	return (
		<Form form={form} onFinish={handleSubmit}>
			<Form.Item
				label='Tên Danh Mục'
				name='name'
				rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
			>
				<Input />
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Lưu' : 'Thêm'}
				</Button>
				<Button onClick={() => setVisible(false)}>Thoát</Button>
			</div>
		</Form>
	);
};

export default FormCategory;
