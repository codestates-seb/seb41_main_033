import styled from 'styled-components';
import InputWrap from '../components/InputWrap';

const EmailWrap = styled.div`
  width: 100%;
`;

const EmailInput = styled.div`
  width: 100%;

  .email_input {
    padding-bottom: 24px;
  }

  .verification {
    font-size: var(--font-head2-size);
    text-align: center;
  }

  p {
    margin-bottom: 16px;
  }

  .email {
    border-radius: 56px;
  }

  button {
    width: 100%;
  }
`;

const Email = () => {
  return (
    <EmailWrap className="card big">
      <EmailInput>
        <div class="email_input">
          <p className="verification">이메일 인증</p>
          <div>
            <p>이메일 입력</p>
            <InputWrap
              className="email"
              type="text"
              name="email"
              placeholder="회원가입시 입력한 이메일을 입력하세요"
              maxLength="100"
            />
          </div>
        </div>
        <button className="normal">인증코드 발급</button>
      </EmailInput>
    </EmailWrap>
  );
};

export default Email;
