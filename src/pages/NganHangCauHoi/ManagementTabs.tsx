import { Tabs } from 'antd';
import KnowledgeCategory from '../NganHangCauHoi/KnowledgeCategory/CategoryManagement';
import QuestionManagement from '../NganHangCauHoi/Question/QuestionManagement';
import SubjectManagement from '../NganHangCauHoi/Subject/SubjectManagement';

const { TabPane } = Tabs;

const ManagementTabs = () => {
	return (
		<Tabs defaultActiveKey="1">
			<TabPane tab="Danh mục kiến thức" key="1">
				<KnowledgeCategory />
			</TabPane>
			<TabPane tab="Quản lý môn học" key="2">
				<SubjectManagement />
			</TabPane>
            <TabPane tab="Quản lý câu hỏi" key="3">
				<QuestionManagement />
			</TabPane>
            <TabPane tab="Ngân hàng đề thi" key="4">
				<QuestionManagement />
			</TabPane>
		</Tabs>
	);
};

export default ManagementTabs;
