export namespace AppointmentModule {
    // Interface Appointment
    export interface Appointment {
      id: string;
      employeeId: string;
      date: string;
      time: string;
      status: "Chờ xác nhận" | "Đã xác nhận" | "Hoàn thành" | "Đã hủy";
      price: number;
      reviewService: number; // Đánh giá dịch vụ
      reviewEmployee: number; // Đánh giá nhân viên
      feedback?: string; // Phản hồi từ nhân viên
    }
}
