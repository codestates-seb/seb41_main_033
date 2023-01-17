import JSConfetti from 'js-confetti';
const jsConfetti = new JSConfetti();

const Confetti = () => {
  jsConfetti.addConfetti({
    emojis: ['🌈', '💥', '✨', '💫', '🦄', '🌟', '💕', '🌺'],
    emojiSize: 100,
    confettiNumber: 70,
  });

  return <div className="con02_event"></div>;
};
export default Confetti;
