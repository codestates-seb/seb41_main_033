import { useState } from 'react';

const usePopup = () => {
  const [popup, setPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const [popupBtn1, setPopupBtn1] = useState(null);
  const [popupBtn2, setPopupBtn2] = useState(null);

  const handlePopup = (
    title = false,
    content = false,
    button1 = false,
    button2 = false
  ) => {
    setPopup((prev) => !prev);
    if (title) setPopupTitle(title);
    if (content) setPopupContent(content);
    if (button1) setPopupBtn1(button1);
    if (button2) setPopupBtn2(button2);
  };

  return { popup, popupTitle, popupContent, popupBtn1, popupBtn2, handlePopup };
};

export default usePopup;
