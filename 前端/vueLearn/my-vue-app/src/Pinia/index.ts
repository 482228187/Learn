import { defineStore } from "pinia";

const countA = defineStore("countA", {
  persist: true,
  state: () => {
    return {
      count: 0,
    };
  },
  getters: {
    double() :number{
      return this.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    }, 
  },
});

export default countA