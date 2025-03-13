import React, { useState, useEffect } from 'react';
import { Button, Table, Rate, Input } from 'antd';
import AppointmentForm from './AppointmentForm';
import { EmployeeModule } from './types';
import { AppointmentModule } from './types';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentModule.Appointment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [employees, setEmployees] = useState<EmployeeModule.Employee[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [feedbackInput, setFeedbackInput] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setAppointments(savedAppointments);
    setEmployees(savedEmployees);
    setServices(savedServices);
  }, []);

  const handleSave = (values: any) => {
    const selectedService = services.find(service => service.name === values.service);
    const newAppointment: AppointmentModule.Appointment = { 
      ...values, 
      id: Date.now().toString(), 
      price: selectedService ? selectedService.price : 0, 
      reviewService: 0,
      reviewEmployee: 0,
      feedback: '' 
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setIsModalVisible(false);
  };

  const handleStatusChange = (id: string, status: string) => {
    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleDelete = (id: string) => {
    const updatedAppointments = appointments.filter(app => app.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleReviewChange = (id: string, reviewType: 'service' | 'employee', value: number) => {
    const updatedAppointments = appointments.map(app => 
      app.id === id ? { ...app, [`review${reviewType.charAt(0).toUpperCase() + reviewType.slice(1)}`]: value } : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleFeedbackInputChange = (id: string, value: string) => {
    setFeedbackInput({ ...feedbackInput, [id]: value });
  };

  const handleSendFeedback = (id: string) => {
    const updatedAppointments = appointments.map(app =>
      app.id === id ? { ...app, feedback: feedbackInput[id] || '' } : app
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Đặt lịch mới
      </Button>

      <Table
        dataSource={appointments}
        rowKey="id"
        columns={[
          { title: 'Khách hàng', dataIndex: 'name' },
          { title: 'Dịch vụ', dataIndex: 'service' },
          { title: 'Nhân viên', dataIndex: 'employeeId', render: (employeeId: string) => employees.find(emp => emp.id === employeeId)?.name },
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Giờ', dataIndex: 'time' },
          { title: 'Trạng thái', dataIndex: 'status' },
          { title: 'Giá tiền', dataIndex: 'price', render: (price: number) => price && !isNaN(price) ? price.toLocaleString() + ' VND' : '--' },
          {
            title: 'Đánh giá dịch vụ', dataIndex: 'reviewService', 
            render: (reviewService: number, record: any) => (
              record.status === 'Hoàn thành' ? (
                <Rate 
                  defaultValue={reviewService} 
                  onChange={(value) => handleReviewChange(record.id, 'service', value)} 
                />
              ) : '--'
            )
          },
          {
            title: 'Đánh giá nhân viên', dataIndex: 'reviewEmployee', 
            render: (reviewEmployee: number, record: any) => (
              record.status === 'Hoàn thành' ? (
                <Rate 
                  defaultValue={reviewEmployee} 
                  onChange={(value) => handleReviewChange(record.id, 'employee', value)} 
                />
              ) : '--'
            )
          },
          {
            title: 'Phản hồi từ nhân viên', dataIndex: 'feedback',
            render: (feedback: string, record: any) => (
              record.status === 'Hoàn thành' ? (
                <div>
                  <Input.TextArea
                    value={feedbackInput[record.id] || feedback}
                    placeholder="Nhập phản hồi..."
                    onChange={(e) => handleFeedbackInputChange(record.id, e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 3 }}
                  />
                  <Button type="primary" onClick={() => handleSendFeedback(record.id)}>Gửi phản hồi</Button>
                </div>
              ) : '--'
            )
          },
          {
            title: 'Hành động', render: (record: any) => (
              <div>
                {record.status !== 'Hoàn thành' && (
                  <Button onClick={() => handleStatusChange(record.id, 'Hoàn thành')}>Hoàn thành</Button>
                )}
                <Button onClick={() => handleDelete(record.id)} danger>Xóa</Button>
              </div>
            )
          }
        ]}
      />

      <AppointmentForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSave}
        employees={employees}
        services={services} 
        appointments={appointments}
      />
    </div>
  );
};

export default AppointmentsPage;
