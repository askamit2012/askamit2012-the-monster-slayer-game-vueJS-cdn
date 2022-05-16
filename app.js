function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// let currentRound = 0;

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        console.log("match draw");
        this.winner = "draw";
      } else if (value <= 0) {
        console.log("Player lost");
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value < 0 && this.playerHealth <= 0) {
        console.log("match draw");
        this.winner = "draw";
      } else if (value <= 0) {
        console.log("monster lost");
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      let attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      //   this.logs.push(`player attacked monster by ${attackValue}`);
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      let attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      //   this.logs.push(`monster attacked playerr by ${attackValue}`);
      this.addLogMessages("monster", "attack", attackValue);
      console.log(this.playerHealth, this.monsterHealth);
    },
    specialAttackMonster() {
      this.currentRound++;
      let attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      //   this.logs.push(`special attack by ${attackValue} `);
      this.addLogMessages("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      let healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        // this.logs.push(`Healing to 100%`);
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
        // this.logs.push(`healing by ${healValue}`);
      }
      this.addLogMessages("player", "heal", healValue);
      this.attackPlayer();
    },
    playAgain() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logs = [];
    },
    surrender() {
      //   this.logs.push(`player did surrender`);
      this.winner = "monster";
    },
    addLogMessages(who, what, value) {
      this.logs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
