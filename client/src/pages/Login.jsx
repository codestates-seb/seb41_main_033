import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/loginstate';
import axios from 'axios';
import { MOBILE_POINT } from '../data/breakpoint';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: var(--col-6);
  margin: 0 auto;

  @media (max-width: ${MOBILE_POINT}) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-size: var(--font-head2-size);
  margin-bottom: 18px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Space = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px;
  &.btn {
    margin-top: 50px;
  }
`;
const LoginInput = styled.input`
  width: 100%;
`;
const LoginBtn = styled.button`
  width: 100%;
  padding: 16px;
`;
const Label = styled.label`
  display: block;
  padding: 8px;
  text-align: left;
`;

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState(false);
  const [psdError, setPsdError] = useState(false);
  const idValid = /^[A-z0-9]{4,16}$/;
  const psdValid = /^(?=.*[A-z])(?=.*\d)(?=.*[~!@])[A-z\d~!@]{8,20}$/;
  const idValueCheck = idValid.test(identifier);
  const psdValueCheck = psdValid.test(password);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const submitHandle = (e) => {
    e.preventDefault();
    if (!idValueCheck) {
      setIdError(true);
    } else if (!psdValueCheck) {
      setIdError(false);
      setPsdError(true);
    } else if (idValueCheck && psdValueCheck) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/members/login`,
          {
            identifier,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          localStorage.clear();
          const expire = Date.now() + 1000 * 60 * 60;
          const refreshtoken = res.headers.refreshtoken;
          const accessToken = res.headers.authorization;
          const memberId = res.data.data.id;
          dispatch(
            login({
              accessToken,
              memberId,
              isLogin: true,
              expire,
              refreshtoken,
            })
          );
          if (location.state && location.state.from === 'signup') {
            navigate('/match');
          } else navigate(-1);
        });
    }
  };

  return (
    <Card className="card big">
      <Title>로그인</Title>
      <Form>
        <Space>
          <Label htmlFor="id"> 아이디</Label>
          <LoginInput
            className={idError && 'error'}
            placeholder="아이디를 입력하세요"
            id="id"
            type="text"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          {idError && (
            <div className="error_caption">올바른 아이디를 입력해 주세요</div>
          )}
        </Space>
        <Space>
          <Label htmlFor="pwd">비밀번호</Label>
          <LoginInput
            autoComplete="on"
            className={psdError && 'error'}
            placeholder="비밀번호를 입력하세요"
            id="pwd"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {psdError && (
            <div className="error_caption">올바른 비밀번호를 입력해주세요.</div>
          )}
        </Space>
        <Space className="btn">
          <LoginBtn type="submit" onClick={submitHandle} className="em">
            로그인
          </LoginBtn>
        </Space>
      </Form>
    </Card>
  );
};
export default Login;
