import styled from 'styled-components';
import InputWrap from '../components/InputWrap';
import { useState } from 'react';

const EmailWrap = styled.div`
  width: var(--col-6);
  margin: 0 auto;

  p {
    margin-bottom: 24px;
  }

  .input_area {
    padding-bottom: 24px;
  }

  .input {
    border-radius: 56px;
  }

  button {
    width: 100%;
  }
`;

const EmailInput = styled.div`
  width: 100%;
  margin-bottom: 24px;

  .verification {
    font-size: var(--font-head2-size);
    text-align: center;
  }

  .clicked {
    background: var(--border-color);
  }
`;

const VerifyInput = styled.div`
  width: 100%;

  .send {
    color: var(--strong-color);
    text-align: center;
    padding: 16px 0;
  }
`;

const Email = () => {
  const [isEmailError, setIsEmailError] = useState({ email: false });
  const [isCodeError, setIsCodeError] = useState({ code: false });
  const [isSend, setIsSend] = useState({ send: false });

  const handleEmail = (e) => {
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    setIsEmailError(
      !e.target.value || !emailRegex.test(e.target.value)
        ? { ...isEmailError, email: true }
        : { ...isEmailError, email: false }
    );
  };

  const handleCode = (e) => {
    setIsCodeError(
      !e.target.value
        ? { ...isCodeError, code: true }
        : { ...isCodeError, code: false }
    );
  };

  const handleSend = () => {
    setIsSend({ ...isSend, send: true });
  };

  return (
    <EmailWrap className="card big">
      <EmailInput>
        <p className="verification">이메일 인증</p>
        <div className="input_area">
          <div>
            <p>이메일 입력</p>
            <InputWrap
              className={
                (isEmailError.email ? 'error input email' : 'input email') +
                (isSend.send ? ' clicked' : '')
              }
              type="text"
              name="email"
              placeholder="회원가입시 입력한 이메일을 입력하세요"
              maxLength="100"
              onChange={handleEmail}
              readOnly={isSend.send ? true : false}
            />
            {isEmailError.email ? (
              <div className="error_caption">올바른 이메일을 입력하세요.</div>
            ) : null}
          </div>
        </div>
        <button className="normal" onClick={handleSend}>
          인증코드 발급
        </button>
      </EmailInput>
      {isSend.send && (
        <VerifyInput>
          <p className="send">인증코드가 전송되었습니다.</p>
          <div className="input_area">
            <p>인증코드 확인</p>
            <InputWrap
              className={
                isCodeError.code ? 'error input verify' : 'input verify'
              }
              type="text"
              name="verification"
              placeholder="인증코드를 입력하세요."
              maxLength="50"
              onChange={handleCode}
            />
            {isCodeError.code ? (
              <div className="error_caption">
                입력하신 인증코드가 올바르지 않습니다.
              </div>
            ) : null}
          </div>
          <button className="em">입력완료</button>
        </VerifyInput>
      )}
    </EmailWrap>
  );
};

export default Email;
