import { Button, Modal, Table, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';

const QuestionManagement = () => {
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [row, setRow] = useState(null);
	const [filters, setFilters] = useState({ subject: '', difficulty: '', knowledgeArea: '' });

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('questions') || '[]');
		setData(storedData);
	}, []);

	const getDataQuestions = () => {
		const storedData = JSON.parse(localStorage.getItem('questions') || '[]');
		setData(storedData);
	};

	const handleAddQuestion = () => {
		setVisible(true);
		setIsEdit(false);
		setRow(null);
	};

	const handleEditQuestion = (record) => {
		setVisible(true);
		setRow(record);
		setIsEdit(true);
	};

	const handleDeleteQuestion = (record) => {
		const newData = data.filter((item) => item.id !== record.id);
		localStorage.setItem('questions', JSON.stringify(newData));
		setData(newData);
	};

	const handleSaveQuestion = (question) => {
		const updatedData = isEdit
			? data.map((item) => (item.id === row?.id ? question : item))
			: [question, ...data];
		localStorage.setItem('questions', JSON.stringify(updatedData));
		setData(updatedData);
		setVisible(false);
	};

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const filteredData = data.filter((item) => {
		return (
			(!filters.subject || item.subject.includes(filters.subject)) &&
			(!filters.difficulty || item.difficulty === filters.difficulty) &&
			(!filters.knowledgeArea || item.knowledgeArea.includes(filters.knowledgeArea))
		);
	});

	const columns = [
		{
			title: 'Question ID',
			dataIndex: 'id',
			key: 'id',
			width: 150,
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
			width: 200,
		},
		{
			title: 'Content',
			dataIndex: 'content',
			key: 'content',
			width: 300,
		},
		{
			title: 'Difficulty',
			dataIndex: 'difficulty',
			key: 'difficulty',
			width: 150,
		},
		{
			title: 'Knowledge Area',
			dataIndex: 'knowledgeArea',
			key: 'knowledgeArea',
			width: 200,
		},
		{
			title: 'Action',
			width: 200,
			align: 'center',
			render: (record) => (
				<div>
					<Button onClick={() => handleEditQuestion(record)}>Edit</Button>
					<Button style={{ marginLeft: 10 }} onClick={() => handleDeleteQuestion(record)} type='primary'>
						Delete
					</Button>
				</div>
			),
		},
	];

	return (
		<div>
			<div style={{ marginBottom: 16 }}>
				<Input placeholder='Search by Subject' onChange={(e) => handleFilterChange('subject', e.target.value)} style={{ width: 200, marginRight: 10 }} />
				<Select placeholder='Select Difficulty' onChange={(value) => handleFilterChange('difficulty', value)} style={{ width: 200, marginRight: 10 }}>
					<Select.Option value='Easy'>Easy</Select.Option>
					<Select.Option value='Medium'>Medium</Select.Option>
					<Select.Option value='Hard'>Hard</Select.Option>
					<Select.Option value='Very Hard'>Very Hard</Select.Option>
				</Select>
				<Input placeholder='Search by Knowledge Area' onChange={(e) => handleFilterChange('knowledgeArea', e.target.value)} style={{ width: 200 }} />
			</div>
			<Button type='primary' onClick={handleAddQuestion}>Add Question</Button>
			<Table dataSource={filteredData} columns={columns} rowKey='id' />
			<Modal destroyOnClose footer={false} title={isEdit ? 'Edit Question' : 'Add Question'} visible={visible} onCancel={() => setVisible(false)}>
				<QuestionForm getDataQuestions={getDataQuestions} setVisible={setVisible} isEdit={isEdit} row={row} onSave={handleSaveQuestion} />
			</Modal>
		</div>
	);
};

export default QuestionManagement;
