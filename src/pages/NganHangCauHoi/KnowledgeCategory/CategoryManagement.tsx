import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import FormCategory from './FormCategory';

const CategoryManagement = () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [row, setRow] = useState(null);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('categories') || '[]');
		setData(storedData);
	}, []);

	const getDataCategory = () => {
		const storedData = JSON.parse(localStorage.getItem('categories') || '[]');
		setData(storedData);
	};

	const handleAddCategory = () => {
		console.log('Opening modal to add category');
		setVisible(true);
		setIsEdit(false);
		setRow(null);
	};

	const handleEditCategory = (record) => {
		console.log('Opening modal to edit category:', record);
		setVisible(true);
		setRow(record);
		setIsEdit(true);
	};

	const handleDeleteCategory = (record) => {
		console.log('Deleting category:', record);
		const newData = data.filter((item) => item.name !== record.name);
		localStorage.setItem('categories', JSON.stringify(newData));
		setData(newData);
	};

	const handleSaveCategory = (category) => {
		const updatedData = isEdit
			? data.map((item) => (item.name === row?.name ? category : item))
			: [category, ...data];
		localStorage.setItem('categories', JSON.stringify(updatedData));
		setData(updatedData);
		setVisible(false);
	};

	const columns = [
		{
			title: 'Tên Danh Mục',
			dataIndex: 'name',
			key: 'name',
			width: 200,
		},
		{
			title: 'Lựa Chọn ',
			width: 200,
			align: 'center',
			render: (record) => (
				<div>
					<Button onClick={() => handleEditCategory(record)}>Sửa </Button>
					<Button style={{ marginLeft: 10 }} onClick={() => handleDeleteCategory(record)} type='primary'>
						Xóa 
					</Button>
				</div>
			),
		},
	];

	useEffect(() => {
		console.log('Modal visibility:', visible);
	}, [visible]);

	return (
		<div>
			<Button type='primary' onClick={handleAddCategory}>Thêm Danh Mục </Button>
			<Table dataSource={data} columns={columns} rowKey="name" />
			<Modal destroyOnClose footer={false} title={isEdit ? 'Edit Category' : 'Add Category'} visible={visible} onCancel={() => setVisible(false)}>
				<FormCategory getDataCategory={getDataCategory} setVisible={setVisible} isEdit={isEdit} row={row} onSave={handleSaveCategory} />
			</Modal>
		</div>
	);
};

export default CategoryManagement;
