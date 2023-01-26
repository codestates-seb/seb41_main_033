import styled from 'styled-components';
import axios from 'axios';
import { API_URL } from '../data/apiUrl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from '../components/Popup';

const Wrap = styled.div`
  width: var(--col-6);
  margin: 0 auto;

  button.em {
    width: 100%;
    margin-top: 24px;
  }
`;

const Title = styled.h3`
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
  font-size: var(--font-head2-size);
  font-weight: var(--font-weight-medium);
`;

const InputWrap = styled.div`
  margin-bottom: 24px;

  label {
    width: 100%;
    margin-bottom: 16px;
  }
  input[type='text'],
  input[type='password'] {
    width: 100%;
  }

  .error_caption {
    padding: 0 16px;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  //회원가입 상태
  const [form, setForm] = useState({
    identifier: '',
    password: '',
    nickname: '',
  });
  const [isError, setIsError] = useState({
    identifier: false,
    password: false,
    nickname: false,
  });
  //회원가입 입력
  const handleInputValue = (key, e) => {
    setForm({ ...form, [key]: e.currentTarget.value });
  };
  //회원가입 API
  const handleSignup = () => {
    const { identifier, password, nickname } = form;
    console.log(form);
    if (!identifier || !/(?=.*\d)|(?=.*[a-zA-Z]).{4,16}/.test(identifier)) {
      setIsError({ ...isError, identifier: true });
      return;
    } else if (
      !password ||
      !/(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@]).{8,20}/.test(password)
    ) {
      setIsError({ ...isError, password: true });
      return;
    } else if (
      !nickname ||
      !/(?=.*\d)|(?=.*[a-zA-Z])|(?=.*[가-힣]).{2,8}/.test(nickname)
    ) {
      setIsError({ ...isError, nickname: true });
      return;
    }
    return axios
      .post(`${API_URL}/api/members/signup`, form)
      .then((res) => {
        setIsOpen((prev) => !prev);
        document.body.style.overflow = 'hidden';
      })
      .catch((err) => alert('회원가입에 실패하였습니다.'));
  };

  const handleLogin = () => {
    navigate(`/login`);
    document.body.style.overflow = 'unset';
  };

  return (
    <Wrap className="card big">
      <Title>회원가입</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputWrap>
          <label>아이디</label>
          <input
            type="text"
            placeholder="4~16자의 영문, 숫자의 아이디를 입력하세요"
            onChange={(e) => handleInputValue('identifier', e)}
            className={isError.identifier ? 'error' : ''}
          />
          {isError.identifier ? (
            <div className="error_caption">
              아이디는 4~16자의 영문, 숫자만 가능합니다.
            </div>
          ) : null}
        </InputWrap>
        <InputWrap>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => handleInputValue('password', e)}
            className={isError.password ? 'error' : ''}
            autoComplete="on"
          />
          {isError.password ? (
            <div className="error_caption">
              비밀번호는 8~20자의 영문, 숫자, 특수문자(~, !, @)가 모두
              포함되어야 합니다.
            </div>
          ) : null}
        </InputWrap>
        <InputWrap>
          <label>닉네임</label>
          <input
            type="text"
            placeholder="2~8자의 영문, 한글, 숫자로 된 닉네임을 입력하세요"
            onChange={(e) => handleInputValue('nickname', e)}
            className={isError.nickname ? 'error' : ''}
          />
          {isError.nickname ? (
            <div className="error_caption">
              닉네임은 2~8자의 영문, 한글, 숫자만 가능합니다.
            </div>
          ) : null}
        </InputWrap>
        <button className="em" onClick={handleSignup}>
          회원가입
        </button>
      </form>
      <Popup
        isOpen={isOpen}
        title="회원가입"
        content="가입을 환영합니다!"
        button1="로그인"
        handleBtn1={handleLogin}
      />
    </Wrap>
  );
};
export default Signup;
