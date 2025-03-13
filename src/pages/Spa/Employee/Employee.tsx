import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import EmployeeForm from './EmployeeForm';
import { EmployeeModule } from './types';

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeModule.Employee[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState<EmployeeModule.Employee | null>(null);

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(savedEmployees);
  }, []);

  const handleSave = (values: any) => {
    const formattedValues = {
      ...values,
      workSchedule: values.workSchedule || {},
    };

    if (isEditing && editRecord) {
      const updatedEmployees = employees.map(emp => 
        emp.id === editRecord.id ? { ...formattedValues, id: editRecord.id } : emp
      );
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    } else {
      const newData = { id: Date.now().toString(), ...formattedValues };
      const updatedEmployees = [...employees, newData];
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div>
      <Button type="primary" onClick={() => { setIsEditing(false); setIsModalVisible(true); }}>
        Thêm nhân viên
      </Button>

      <Table 
        dataSource={employees} 
        rowKey="id" 
        columns={[
          { title: 'Tên nhân viên', dataIndex: 'name', align: 'center' },
          { title: 'Số khách tối đa/ngày', dataIndex: 'maxClientsPerDay', align: 'center' },
          {
            title: 'Lịch làm việc',
            dataIndex: 'workSchedule',
            render: (schedule) => 
              schedule && typeof schedule === 'object'
                ? Object.entries(schedule).map(([day, hours]) => (
                    <div key={day}>{day}: {hours?.start || 'Chưa có'} - {hours?.end || 'Chưa có'}</div>
                  ))
                : 'Chưa có lịch',
            align: 'center'
          },          
          { 
            title: 'Hành động', 
            align: 'center',
            render: (record) => (
              <>
                <Button onClick={() => { setEditRecord(record); setIsEditing(true); setIsModalVisible(true); }}>
                  Sửa
                </Button>
                <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
              </>
            )
          }
        ]} 
      />
      
      <EmployeeForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        isEditing={isEditing}
        editRecord={editRecord}
      />
    </div>
  );
};

export default Employee;
