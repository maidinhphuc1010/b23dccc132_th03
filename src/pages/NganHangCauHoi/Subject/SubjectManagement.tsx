import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import SubjectForm from './SubjectForm';

const SubjectManagement = () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [row, setRow] = useState(null);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('subjects') || '[]');
		setData(storedData);
	}, []);

	const getDataSubjects = () => {
		const storedData = JSON.parse(localStorage.getItem('subjects') || '[]');
		setData(storedData);
	};

	const handleAddSubject = () => {
		console.log('Opening modal to add subject');
		setVisible(true);
		setIsEdit(false);
		setRow(null);
	};

	const handleEditSubject = (record) => {
		console.log('Opening modal to edit subject:', record);
		setVisible(true);
		setRow(record);
		setIsEdit(true);
	};

	const handleDeleteSubject = (record) => {
		console.log('Deleting subject:', record);
		const newData = data.filter((item) => item.code !== record.code);
		localStorage.setItem('subjects', JSON.stringify(newData));
		setData(newData);
	};

	const handleSaveSubject = (subject) => {
		const updatedData = isEdit
			? data.map((item) => (item.code === row?.code ? subject : item))
			: [subject, ...data];
		localStorage.setItem('subjects', JSON.stringify(updatedData));
		setData(updatedData);
		setVisible(false);
	};

	const columns = [
		{
			title: 'Subject Code',
			dataIndex: 'code',
			key: 'code',
			width: 150,
		},
		{
			title: 'Subject Name',
			dataIndex: 'name',
			key: 'name',
			width: 250,
		},
		{
			title: 'Credits',
			dataIndex: 'credits',
			key: 'credits',
			width: 100,
		},
		{
			title: 'Action',
			width: 200,
			align: 'center',
			render: (record) => (
				<div>
					<Button onClick={() => handleEditSubject(record)}>Edit</Button>
					<Button style={{ marginLeft: 10 }} onClick={() => handleDeleteSubject(record)} type='primary'>
						Delete
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
			<Button type='primary' onClick={handleAddSubject}>Add Subject</Button>
			<Table dataSource={data} columns={columns} rowKey="code" />
			<Modal destroyOnClose footer={false} title={isEdit ? 'Edit Subject' : 'Add Subject'} visible={visible} onCancel={() => setVisible(false)}>
				<SubjectForm getDataSubjects={getDataSubjects} setVisible={setVisible} isEdit={isEdit} row={row} onSave={handleSaveSubject} />
			</Modal>
		</div>
	);
};

export default SubjectManagement;
