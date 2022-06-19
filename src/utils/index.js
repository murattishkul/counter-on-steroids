export const gameSettings = {
  cps : {
    easy: 5, medium: 3, hard: 1
  },
  overdriveChance: {
    easy: 6, medium: 2, hard: 1
  },
  overdriveDuration: {
    easy: 15, medium: 10, hard: 5
  }
}

export const killTimers = () => {
  var killId = setTimeout(function() {
    for (var i = killId; i > 0; i--) clearInterval(i)
  }, 3000);
}
export function getRandomInt(min=1, max=21) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}
  