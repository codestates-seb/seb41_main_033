import styled from 'styled-components';
import InputWrap from '../components/InputWrap';

const EmailWrap = styled.div`
  width: 100%;

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
  return (
    <EmailWrap className="card big">
      <EmailInput>
        <p className="verification">이메일 인증</p>
        <div class="input_area">
          <div>
            <p>이메일 입력</p>
            <InputWrap
              className="input email"
              type="text"
              name="email"
              placeholder="회원가입시 입력한 이메일을 입력하세요"
              maxLength="100"
            />
          </div>
        </div>
        <button className="normal">인증코드 발급</button>
      </EmailInput>
      <VerifyInput>
        <p className="send">인증코드가 전송되었습니다.</p>
        <div className="input_area">
          <p>인증코드 확인</p>
          <InputWrap
            className="input verify"
            type="text"
            name="verification"
            placeholder="인증코드를 입력하세요."
            maxLength="50"
          />
        </div>
        <button className="em">입력완료</button>
      </VerifyInput>
    </EmailWrap>
  );
};

export default Email;
