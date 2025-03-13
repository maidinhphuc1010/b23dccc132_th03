import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Button, Select } from 'antd';
import { EmployeeModule } from './types';
import dayjs from 'dayjs';

const { Option } = Select;

interface AppointmentFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: any) => void;
  employees: EmployeeModule.Employee[];
  appointments: any[];
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ visible, onClose, onSave, employees, appointments }) => {
  const [form] = Form.useForm();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModule.Employee | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [services, setServices] = useState<{ name: string, price: number }[]>([]);

  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        if (Array.isArray(parsedServices)) {
          setServices(parsedServices);
        } else {
          console.warn('Dữ liệu dịch vụ không hợp lệ trong localStorage.');
        }
      } catch (error) {
        console.error('Lỗi khi parse dữ liệu dịch vụ từ localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      const service = services.find(s => s.name === selectedService);
      setPrice(service ? service.price : null);
    }
  }, [selectedService, services]);

  const handleEmployeeChange = (value: string) => {
    setSelectedEmployee(employees.find(emp => emp.id === value) || null);
  };

  const handleScheduleChange = (date: any, time: any) => {
    // Chuyển đổi time thành đối tượng dayjs
    const formattedTime = time ? dayjs(time).format('HH:mm') : '';
    const isConflict = appointments.some(app => {
      const appDate = dayjs(app.date).format('YYYY-MM-DD');
      const appTimeStart = dayjs(app.timeStart, 'HH:mm');
      const appTimeEnd = dayjs(app.timeEnd, 'HH:mm');
      return app.employeeId === selectedEmployee?.id && appDate === date.format('YYYY-MM-DD') &&
        (appTimeStart.isBefore(time) && appTimeEnd.isAfter(time));
    });
  
    if (isConflict) {
      Modal.error({ title: 'Lịch đã có', content: 'Lịch đã được đặt vào thời gian này. Vui lòng chọn thời gian khác.' });
    }
  };
  

  const handleSave = () => {
    const values = form.getFieldsValue();
    if (selectedEmployee && selectedService) {
      onSave({ ...values, employeeId: selectedEmployee.id, service: selectedService, price });
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSave}>
        <Form.Item name="name" label="Tên khách hàng" rules={[{ required: true, message: 'Bắt buộc nhập' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="date" label="Ngày" rules={[{ required: true, message: 'Bắt buộc chọn ngày' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="time" label="Giờ" rules={[{ required: true, message: 'Bắt buộc chọn giờ' }]}>
          <TimePicker format="HH:mm" onChange={handleScheduleChange} />
        </Form.Item>

        <Form.Item name="employee" label="Chọn nhân viên" rules={[{ required: true, message: 'Bắt buộc chọn nhân viên' }]}>
          <Select onChange={handleEmployeeChange}>
            {employees.map(employee => (
              <Option key={employee.id} value={employee.id}>{employee.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="service" label="Dịch vụ" rules={[{ required: true, message: 'Bắt buộc chọn dịch vụ' }]}>
          <Select onChange={setSelectedService}>
            {services.map(service => (
              <Option key={service.name} value={service.name}>{service.name}</Option>
            ))}
          </Select>
        </Form.Item> 

        {price !== null && <div><strong>Giá dịch vụ: </strong>{price} VND</div>}

        <Button type="primary" htmlType="submit">Đặt lịch</Button>
      </Form>
    </Modal>
  );
};

export default AppointmentForm;
