import styled from "styled-components";

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
	input[type="text"] {
		width: 100%;
	}

	.error_caption {
		padding: 0 16px;
	}
`;

const Signup = () => {
	const isError = false;

	return (
		<Wrap className="card big">
			<Title>회원가입</Title>
			<InputWrap>
				<label>아이디</label>
				<input type="text" placeholder="4~16자의 영문, 숫자의 아이디를 입력하세요" className={isError ? "error" : ""} />
				{isError ? <div className="error_caption">아이디는 4~16자의 영문, 숫자만 가능합니다.</div> : null}
			</InputWrap>
			<InputWrap>
				<label>비밀번호</label>
				<input type="text" placeholder="비밀번호를 입력하세요" className={isError ? "error" : ""} />
				{isError ? <div className="error_caption">비밀번호는 8~20자의 영문, 숫자, 특수문자(~, !, @)가 모두 포함되어야 합니다.</div> : null}
			</InputWrap>
			<InputWrap>
				<label>닉네임</label>
				<input type="text" placeholder="2~8자의 영문, 숫자로 된 닉네임을 입력하세요" className={isError ? "error" : ""} />
				{isError ? <div className="error_caption">닉네임은 2~8자의 영문, 숫자만 가능합니다.</div> : null}
			</InputWrap>
			<button className="em">회원가입</button>
		</Wrap>
	);
};
export default Signup;
