import React, { useState, useEffect } from 'react';
import { Table, Rate, Tabs } from 'antd';
import { AppointmentModule } from './types';
import { EmployeeModule } from './types';

const { TabPane } = Tabs;

const RatingsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentModule.Appointment[]>([]);
  const [employees, setEmployees] = useState<EmployeeModule.Employee[]>([]);
  const [services, setServices] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setAppointments(savedAppointments);
    setEmployees(savedEmployees);
    setServices(savedServices);
  }, []);

  const calculateAverageRating = (id: string, type: 'employee' | 'service') => {
    const relevantAppointments = appointments.filter(app => {
      return type === 'employee' ? app.employeeId === id : app.service === id;
    });

    const totalRating = relevantAppointments.reduce((sum, app) => {
      return sum + (type === 'employee' ? app.reviewEmployee : app.reviewService);
    }, 0);

    return relevantAppointments.length > 0 ? totalRating / relevantAppointments.length : 0;
  };

  const employeeRatings = employees.map(employee => ({
    ...employee,
    averageRating: calculateAverageRating(employee.id, 'employee'),
  }));

  const serviceRatings = services.map(service => ({
    ...service,
    averageRating: calculateAverageRating(service.name, 'service'),
  }));

  return (
    <div>
      <h2>Đánh giá trung bình</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Nhân viên" key="1">
          <Table
            dataSource={employeeRatings}
            rowKey="id"
            columns={[
              { 
                title: 'Nhân viên', 
                dataIndex: 'name',
                key: 'name',
              },
              { 
                title: 'Đánh giá trung bình', 
                key: 'rating',
                render: (_: any, record: any) => (
                  <div>
                    <Rate disabled value={record.averageRating} />
                    <span>{record.averageRating.toFixed(1)} / 5</span>
                  </div>
                ),
              },
            ]}
          />
        </TabPane>

        <TabPane tab="Dịch vụ" key="2">
          <Table
            dataSource={serviceRatings}
            rowKey="name"
            columns={[
              { 
                title: 'Dịch vụ', 
                dataIndex: 'name',
                key: 'name',
              },
              { 
                title: 'Đánh giá trung bình', 
                key: 'rating',
                render: (_: any, record: any) => (
                  <div>
                    <Rate disabled value={record.averageRating} />
                    <span>{record.averageRating.toFixed(1)} / 5</span>
                  </div>
                ),
              },
            ]}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RatingsPage;
