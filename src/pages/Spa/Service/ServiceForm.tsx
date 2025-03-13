import { Form, Input, InputNumber, Modal, Button } from 'antd';
import { useEffect } from 'react';

const ServiceForm = ({ visible, onClose, onSave, isEditing, editRecord }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        ...editRecord,
      });
    } else {
      form.resetFields();  // Reset form khi modal đóng
    }
  }, [visible, editRecord, form]);

  return (
    <Modal visible={visible} onCancel={() => { form.resetFields(); onClose(); }} footer={null}>
      <Form form={form} onFinish={() => { 
        onSave(form.getFieldsValue()); 
        form.resetFields();  // Reset form sau khi lưu
      }}>
        <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Bắt buộc nhập' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá dịch vụ" rules={[{ required: true, type: 'number' }]}> 
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="duration" label="Thời gian thực hiện (phút)" rules={[{ required: true, type: 'number' }]}> 
          <InputNumber min={1} />
        </Form.Item>

        <Button type="primary" htmlType="submit">{isEditing ? 'Lưu' : 'Thêm'}</Button>
      </Form>
    </Modal>
  );
};

export default ServiceForm;
