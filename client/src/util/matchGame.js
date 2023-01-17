const matchGame = (game) => {
  const BASE_URL = '/images';

  switch (game.id) {
    case 1:
      return { title: game.korTitle, image: `${BASE_URL}/롤.png` };
    case 2:
      return { title: game.korTitle, image: `${BASE_URL}/발로란트.png` };
    case 3:
      return { title: game.korTitle, image: `${BASE_URL}/오버워치2.png` };
    case 4:
      return { title: game.korTitle, image: `${BASE_URL}/로스트아크.png` };
    case 5:
      return { title: game.korTitle, image: `${BASE_URL}/메이플스토리.png` };
    case 6:
      return { title: game.korTitle, image: `${BASE_URL}/서든어택.png` };
    case 7:
      return { title: game.korTitle, image: `${BASE_URL}/배틀그라운드.png` };
    case 8:
      return { title: game.korTitle, image: `${BASE_URL}/던전앤파이터.png` };
    case 9:
      return { title: game.korTitle, image: `${BASE_URL}/사이퍼즈.png` };
    case 10:
      return { title: game.korTitle, image: `${BASE_URL}/마인크래프트.png` };
    case 11:
      return { title: game.korTitle, image: `${BASE_URL}/디아블로2.png` };
    case 12:
      return { title: game.korTitle, image: `${BASE_URL}/디아블로3.png` };
    case 13:
      return { title: game.korTitle, image: `${BASE_URL}/어몽어스.png` };
    case 14:
      return { title: game.korTitle, image: `${BASE_URL}/파이널판타지14.png` };
    case 15:
      return { title: game.korTitle, image: `${BASE_URL}/이터널리턴.png` };
    case 16:
      return { title: game.korTitle, image: `${BASE_URL}/스팀.png` };
    case 17:
      return { title: game.korTitle, image: `${BASE_URL}/닌텐도.png` };
    case 18:
      return { title: game.korTitle, image: `${BASE_URL}/기타.png` };
    default:
      alert('없는 게임입니다.');
  }
};

export default matchGame;
