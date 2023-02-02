const matchGame = (game) => {
  const BASE_URL = "/images";

  switch (game.id) {
    case 1:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/롤.png`,
        url: "https://www.leagueoflegends.com/ko-kr/",
      };
    case 2:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/발로란트.png`,
        url: "https://playvalorant.com/ko-kr/",
      };
    case 3:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/오버워치2.png`,
        url: "https://overwatch.blizzard.com/ko-kr/",
      };
    case 4:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/로스트아크.png`,
        url: "https://lostark.game.onstove.com/Promotion/Update/221221/Landing",
      };
    case 5:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/메이플스토리.png`,
        url: "https://maplestory.nexon.com/Promotion/event/2022/20221222/intro/2st",
      };
    case 6:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/서든어택.png`,
        url: "https://event.sa.nexon.com/230119/intro",
      };
    case 7:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/배틀그라운드.png`,
        url: "https://pubg.game.daum.net/pubg/index.daum",
      };
    case 8:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/던전앤파이터.png`,
        url: "https://df.nexon.com/df/home",
      };
    case 9:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/사이퍼즈.png`,
        url: "https://cyphers.nexon.com/",
      };
    case 10:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/마인크래프트.png`,
        url: "https://www.minecraft.net/ko-kr",
      };
    case 11:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/디아블로2.png`,
        url: "https://diablo2.blizzard.com/ko-kr/",
      };
    case 12:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/디아블로3.png`,
        url: "https://kr.diablo3.blizzard.com/ko-kr/",
      };
    case 13:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/어몽어스.png`,
        url: "https://www.bluestacks.com/ko/apps/action/among-us-on-pc.html",
      };
    case 14:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/파이널판타지14.png`,
        url: "https://www.ff14.co.kr/main",
      };
    case 15:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/이터널리턴.png`,
        url: "https://playeternalreturn.com/main?hl=ko-KR",
      };
    case 16:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/스팀.png`,
        url: "https://store.steampowered.com/",
      };
    case 17:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/닌텐도.png`,
        url: "https://www.nintendo.co.kr/",
      };
    case 18:
      return {
        title: game.korTitle,
        image: `${BASE_URL}/기타.png`,
        url: "https://skribbl.io/",
      };
    default:
      alert("없는 게임입니다.");
  }
};

export default matchGame;
