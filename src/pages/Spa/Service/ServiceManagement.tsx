import { useState, useEffect } from 'react';
import { Button, Table, notification } from 'antd';
import ServiceForm from './ServiceForm';

const ServiceManagement = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState<any | null>(null);

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(savedServices);
  }, []);

  const handleSave = (values: any) => {
    const formattedValues = {
      ...values,
    };

    // Kiểm tra trùng tên dịch vụ
    const isDuplicate = services.some(service => service.name === values.name);
    if (isDuplicate) {
      notification.error({
        message: 'Lỗi',
        description: 'Dịch vụ này đã tồn tại!',
      });
      return; // Ngừng việc lưu dữ liệu nếu trùng tên
    }

    if (isEditing && editRecord) {
      const updatedServices = services.map(service =>
        service.id === editRecord.id ? { ...formattedValues, id: editRecord.id } : service
      );
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
    } else {
      const newData = { id: Date.now().toString(), ...formattedValues };
      const updatedServices = [...services, newData];
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id: string) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  return (
    <div>
      <Button type="primary" onClick={() => { setIsEditing(false); setIsModalVisible(true); }}>
        Thêm dịch vụ
      </Button>

      <Table 
        dataSource={services} 
        rowKey="id" 
        columns={[
          { title: 'Tên dịch vụ', dataIndex: 'name', align: 'center' },
          { title: 'Giá dịch vụ', dataIndex: 'price', align: 'center' },
          { title: 'Thời gian thực hiện', dataIndex: 'duration', align: 'center' },
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
      
      <ServiceForm
        visible={isModalVisible}
        onClose={() => { setIsModalVisible(false); setEditRecord(null); }}  // Reset form và record khi đóng modal
        onSave={handleSave}
        isEditing={isEditing}
        editRecord={editRecord}
      />
    </div>
  );
};

export default ServiceManagement;
