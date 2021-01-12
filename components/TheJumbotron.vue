<template lang="pug">
.jumbotron
  h1
    span(
      v-for="(item, index) in parallaxTitle",
      :key="index",
      v-parallax="item.rate"
    ) {{ item.char }}
</template>

<script>
import vParallax from "@/directives/v-parallax";
export default {
  name: "TheJumbotron",
  directives: {
    parallax: vParallax,
  },
  props: {
    title: {
      type: String,
      default: "Repos",
    },
  },
  data() {
    return {};
  },
  computed: {
    parallaxTitle() {
      return this.title.split("").map((char, index, array) => {
        let rate = 0;
        const mid = Math.floor(array.length / 2);
        const left = index < mid;
        const right = index > mid;

        if (left) {
          rate = -0.6 + (index - mid) * 0.5;
        }
        if (right) {
          rate = 0.6 + (index - mid) * 0.5;
        }

        return {
          char,
          rate,
        };
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.jumbotron {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px 0;
  overflow: hidden;

  h1 {
    font-weight: 500;
    font-size: 0;
    margin: 0;
    padding: 0;

    span {
      font-size: 36px;
      display: inline-block;
    }
  }
}
</style>
