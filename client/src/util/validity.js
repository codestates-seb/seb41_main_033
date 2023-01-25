const validity = (data) => {
  if (data.title.length < 5 || data.title.length > 30) {
    return alert("제목을 입력해 주세요 (최소 5자 최대 30자)");
  } else if (data.game.length === 0 || data.game === "게임을 선택하세요") {
    return alert("게임을 선택하세요");
  } else if (data.team.length === 0) {
    return alert("팀원을 숫자로 입력해주세요 (최대 24명)");
  } else if (data.tags.length === 0) {
    return alert("태그입력 후 엔터를 쳐주세요");
  } else if (data.content.length < 5 || data.content.length > 500) {
    return alert("내용을 입력해주세요 (최소5자 최대 500자)");
  }
};

export default validity;
