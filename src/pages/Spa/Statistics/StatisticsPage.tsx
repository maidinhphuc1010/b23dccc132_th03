import React, { useState, useEffect } from 'react';
import { Table, Card, Tabs, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const StatisticsPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const savedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const savedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setAppointments(savedAppointments);
    setEmployees(savedEmployees);
    setServices(savedServices);
  }, []);

  const filterAppointmentsByDate = (type: 'day' | 'month') => {
    const counts: { [key: string]: number } = {};
    appointments.forEach(app => {
      const key = type === 'day' ? app.date.split('T')[0] : dayjs(app.date).format('YYYY-MM');
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  };

  const getRevenueByService = () => {
    const revenue: { [key: string]: number } = {};
    appointments.forEach(app => {
      revenue[app.service] = (revenue[app.service] || 0) + (app.price || 0);
    });
    return revenue;
  };

  const getRevenueByEmployee = () => {
    const revenue: { [key: string]: number } = {};
    appointments.forEach(app => {
      revenue[app.employeeId] = (revenue[app.employeeId] || 0) + (app.price || 0);
    });
    return revenue;
  };

  const getTotalRevenue = () => {
    return appointments.reduce((total, app) => total + (app.price || 0), 0);
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Thống kê theo ngày" key="1">
        <Card title="Số lượng lịch hẹn theo ngày">
          <Table
            dataSource={Object.keys(filterAppointmentsByDate('day')).map(date => ({ date, count: filterAppointmentsByDate('day')[date] }))}
            rowKey="date"
            columns={[{ title: 'Ngày', dataIndex: 'date' }, { title: 'Số lượng', dataIndex: 'count' }]}
            pagination={false}
          />
        </Card>
      </TabPane>
      
      <TabPane tab="Thống kê theo tháng" key="2">
        <Card title="Số lượng lịch hẹn theo tháng">
          <Table
            dataSource={Object.keys(filterAppointmentsByDate('month')).map(month => ({ month, count: filterAppointmentsByDate('month')[month] }))}
            rowKey="month"
            columns={[{ title: 'Tháng', dataIndex: 'month' }, { title: 'Số lượng', dataIndex: 'count' }]}
            pagination={false}
          />
        </Card>
      </TabPane>
      
      <TabPane tab="Doanh thu theo dịch vụ" key="3">
        <Card title="Doanh thu theo dịch vụ">
          <Table
            dataSource={Object.keys(getRevenueByService()).map(service => ({ service, revenue: getRevenueByService()[service] }))}
            rowKey="service"
            columns={[{ title: 'Dịch vụ', dataIndex: 'service' }, { title: 'Doanh thu', dataIndex: 'revenue', render: revenue => `${revenue.toLocaleString()} VND` }]}
            pagination={false}
          />
        </Card>
      </TabPane>
      
      <TabPane tab="Doanh thu theo nhân viên" key="4">
        <Card title="Doanh thu theo nhân viên">
          <Table
            dataSource={Object.keys(getRevenueByEmployee()).map(employeeId => {
              const employeeName = employees.find(emp => emp.id === employeeId)?.name || 'Không xác định';
              return { employee: employeeName, revenue: getRevenueByEmployee()[employeeId] };
            })}
            rowKey="employee"
            columns={[{ title: 'Nhân viên', dataIndex: 'employee' }, { title: 'Doanh thu', dataIndex: 'revenue', render: revenue => `${revenue.toLocaleString()} VND` }]}
            pagination={false}
          />
        </Card>
        <Card title="Tổng doanh thu" style={{ marginTop: 16 }}>
          <h2>{getTotalRevenue().toLocaleString()} VND</h2>
        </Card>
      </TabPane>
    </Tabs>
  );
};

export default StatisticsPage;
