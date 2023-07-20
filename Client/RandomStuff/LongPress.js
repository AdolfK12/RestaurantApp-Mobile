import { useState } from "react";

const useLongPress = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handlePressOut = () => {
    setModalVisible(false);
  };

  return { modalVisible, handleLongPress, handlePressOut };
};

export default useLongPress;
