<template lang="pug">
.app-index
  the-jumbotron
  template(v-if="repos")
    repo-list(:repos="repos", :isLoading="isLoading")
    span(v-observe="handleObserve")
</template>

<script>
import { mapGetters } from "vuex";
import TheJumbotron from "@/components/TheJumbotron";
import RepoList from "@/components/RepoList";
import vObserve from "@/directives/v-observe";

const USER_NAME = "muyunwu";
export default {
  name: "App",
  directives: {
    observe: vObserve,
  },
  components: {
    TheJumbotron,
    RepoList,
  },
  data() {
    return {
      repos: null,
      nextPage: 1,
    };
  },
  computed: {
    ...mapGetters({ isLoading: "loading/isLoading" }),
  },
  created() {
    this.fetchRepos(this.nextPage, 5).then((data) => {
      this.getNextRepos(data);
    });
  },
  methods: {
    fetchRepos(page = 1, per_page = 1) {
      return this.$axios.$get(
        `https://api.github.com/users/${USER_NAME}/repos?page=${page}&per_page=${per_page}`
      );
    },
    getNextRepos(repos) {
      const prevRepos = this.repos || [];
      const nextRepos = repos.map((repo) => ({
        id: repo.id,
        title: repo.name,
        description: repo.description || "-",
        url: repo.url,
      }));
      this.repos = [...prevRepos, ...nextRepos];
      this.nextPage++;
    },
    handleObserve({ entry, observer, unobserve }) {
      if (this.isLoading) {
        return;
      }
      this.fetchRepos(this.nextPage).then((data) => {
        if (!data.length) {
          unobserve();
        } else {
          this.getNextRepos(data);
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0 30px;
  min-height: 100vh;
  background: #efefef;
}
</style>
