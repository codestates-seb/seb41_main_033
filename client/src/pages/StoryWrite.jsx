import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StoryInputArea from '../components/StoryInputArea';
import { API_URL } from '../data/apiUrl';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const StoryWrite = () => {
  const navigate = useNavigate();
  const { accessToken, memberId } = useSelector((state) => state.islogin.login);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/api/members/${memberId}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleWriteSubmit = (content, file) => {
    const data = { content };
    const formData = new FormData();
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      })
    );
    if (file) formData.append('file', file);

    axios
      .post(`${API_URL}/api/boards`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        navigate('/story');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userData) {
    return (
      <StoryInputArea
        page="write"
        handleSubmit={handleWriteSubmit}
        data={userData}
      />
    );
  } else {
    return null;
  }
};
export default StoryWrite;
