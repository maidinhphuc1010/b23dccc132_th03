import { Form, Input, Modal, InputNumber, TimePicker, Button } from 'antd';
import { EmployeeModule } from './types';
import { useEffect, useState } from 'react';
import moment from 'moment';

const daysOfWeek = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

const EmployeeForm = ({ visible, onClose, onSave, isEditing, editRecord }: any) => {
  const [form] = Form.useForm();
  const [workSchedule, setWorkSchedule] = useState<{ [key: string]: { start: string, end: string } }>({});

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        ...editRecord,
        workSchedule: editRecord?.workSchedule || {},
      });
      setWorkSchedule(editRecord?.workSchedule || {});
    } else {
      form.resetFields(); 
      setWorkSchedule({});
    }
  }, [visible, editRecord, form]);

  const handleScheduleChange = (day: string, type: 'start' | 'end', time: any) => {
    setWorkSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: time ? time.format("HH:mm") : "",
      },
    }));
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={() => { 
        onSave({ ...form.getFieldsValue(), workSchedule }); 
        form.resetFields(); 
      }}>
        <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Bắt buộc nhập' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="maxClientsPerDay" label="Số khách tối đa/ngày" rules={[{ required: true, type: 'number' }]}> 
          <InputNumber min={1} />
        </Form.Item>
        
        <h4>Lịch làm việc</h4>
        {daysOfWeek.map(day => (
          <Form.Item key={day} label={day}>
            <TimePicker 
              format="HH:mm" 
              onChange={(time) => handleScheduleChange(day, 'start', time)}
              placeholder="Giờ bắt đầu"
            />
            {' - '}
            <TimePicker 
              format="HH:mm" 
              onChange={(time) => handleScheduleChange(day, 'end', time)}
              placeholder="Giờ kết thúc"
            />
          </Form.Item>
        ))}
        
        <Button type="primary" htmlType="submit">{isEditing ? 'Lưu' : 'Thêm'}</Button>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
