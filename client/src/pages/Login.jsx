import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /*임시설정?*/
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 0px;
`;
const Space = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px;
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
  width: var(--col-6);
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Valid = styled.span`
  color: var(--red);
  display: block;
  padding: 8px;
  text-align: left;
`;
const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState("");
  const idValid = /^[A-z0-9]{4,16}$/;
  const psdValid = /^(?=.*[A-z])(?=.*\d)(?=.*[~!@])[A-z\d~!@]{8,}$/;
  const idValueCheck = idValid.test(identifier);
  const psdValueCheck = psdValid.test(password);

  const submitHandle = (e) => {
    e.preventDefault();
    if (!idValueCheck) {
      setIsValid("아이디 형식이 올바르지 않아요");
    } else if (!psdValueCheck) {
      setIsValid("");
      setIsValid("패스워드 형식이 올바르지 않아요");
    } else if (idValueCheck && psdValueCheck) {
      const data = { identifier, password };
      console.log(data);
      //   axios
      //     .post(
      //       "https://813c-14-63-98-43.jp.ngrok.io/games",
      //       {
      //         data,
      //       },
      //       {
      //         withCredentials: true,
      //       }
      //     )
      //     .then((res) => console.log(res));
    }
  };

  return (
    <Flex>
      <Wrap>
        <Card className="card big">
          <Title>로그인</Title>
          <Form>
            <Space>
              <Label htmlFor="id"> 아이디</Label>
              <LoginInput
                id="id"
                type="text"
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </Space>
            <Space>
              <Label htmlFor="pwd">비밀번호</Label>
              <LoginInput
                id="pwd"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Space>
            <Space>
              <Valid>{isValid}</Valid>
            </Space>
            <Space>
              <LoginBtn type="submit" onClick={submitHandle} className="em">
                로그인
              </LoginBtn>
            </Space>
          </Form>
        </Card>
      </Wrap>
    </Flex>
  );
};
export default Login;
