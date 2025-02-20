import React, { useState } from "react";
import { Input, Button, Typography, Card, Modal } from "antd";

const { Title, Text } = Typography;

const GuessNumberGame: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleGuess = () => {
    if (guess === null) return;
    setAttempts(attempts + 1);
    if (guess < randomNumber) {
      setMessage("❌ Bạn đoán quá thấp!");
    } else if (guess > randomNumber) {
      setMessage("❌ Bạn đoán quá cao!");
    } else {
      setMessage("🎉 Chúc mừng! Bạn đã đoán đúng!");
    }
    if (attempts >= 9 && guess !== randomNumber) {
      setMessage(`❌ Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(Number(e.target.value));
  };

  const handleRestart = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setMessage("");
    setAttempts(0);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleRestart();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center mb-8 max-w-2xl">
        <Title level={1} className="text-yellow-400 text-5xl">
          Chào mừng bạn đến với trò chơi đoán số!
        </Title> <br />
        <Text className="text-gray-300 block mb-4 text-2xl">
          Hãy thử thách bản thân bằng cách đoán số mà hệ thống đã chọn. Bạn có 10 lượt để đoán đúng số từ 1 đến 100.
        </Text> <br />
        <Text className="text-gray-300 block mb-4 text-2xl">
          Nhấn nút "Play" để bắt đầu trò chơi. Chúc bạn may mắn!
        </Text> <br />
        <Text className="text-gray-300 block mb-4 text-2xl">
          Trò chơi này sẽ giúp bạn rèn luyện khả năng phán đoán và sự kiên nhẫn. Hãy thử sức ngay bây giờ! Bạn sẽ có cơ hội kiểm tra khả năng dự đoán của mình và xem liệu bạn có thể đoán đúng số mà hệ thống đã chọn trong vòng 10 lượt hay không. Hãy nhớ rằng mỗi lần đoán sai, bạn sẽ nhận được gợi ý để giúp bạn tiến gần hơn đến con số chính xác. Chúc bạn có những giây phút thư giãn và thú vị với trò chơi này!
        </Text>
      </div> <br />
      <Button type="primary" onClick={showModal} className="bg-blue-500 hover:bg-blue-700 border-none text-3xl px-6 py-3">
        Play 🎮
      </Button>
      <Modal
        title={<Title level={2} className="text-yellow-400 text-3xl">🎯 THỬ THÁCH TÀI NĂNG</Title>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="restart" onClick={handleRestart} className="bg-red-500 hover:bg-red-700 border-none text-white text-2xl px-6 py-3">
            Chơi lại 🔄
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk} className="bg-blue-500 hover:bg-blue-700 border-none text-2xl px-6 py-3">
            OK
          </Button>,
        ]}
      >
        <div className="text-center">
          <Text className="text-gray-300 block mb-2 text-2xl">
            Hệ thống đã chọn một số từ <b>1 - 100</b>.
          </Text> <br />
          <Text className="text-gray-300 block mb-4 text-2xl">
            Bạn còn <b className="text-red-500">{10 - attempts} lượt</b> để đoán!
          </Text>

          <Input
            type="number"
            value={guess ?? ""}
            onChange={handleInputChange}
            className="mb-4 p-3 text-center border border-gray-500 bg-gray-700 text-white rounded text-2xl"
            placeholder="Nhập số..."
          />
          <Button
            type="primary"
            onClick={handleGuess}
            className="w-full mb-4 bg-blue-500 hover:bg-blue-700 border-none text-2xl px-6 py-3"
          >
            Đoán 🔍
          </Button> <br />

          <Text className="mt-4 text-3xl font-semibold text-yellow-400">{message}</Text>
        </div>
      </Modal>
    </div>
  );
};

export default GuessNumberGame;
