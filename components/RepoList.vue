<template lang="pug">
.repo-list
  .repo-item(v-for="repo in repos", :key="repo.id")
    .repo-name {{ repo.title }}
    .repo-description {{ repo.description }}
    a.repo-link(:href="repo.url", taret="_blank") {{ repo.url }}

  .repo-item(v-if="isLoading")
    .repo-name.loading
    .repo-description.loading
    .repo-link.loading
</template>

<script>
export default {
  name: "RepoList",
  props: {
    repos: {
      type: [Array, null],
      default: null,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.repo {
  &-item {
    background-color: #fff;
    padding: 20px;
    text-align: left;
    min-height: 100px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    & + .repo-item {
      margin-top: 20px;
    }

    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }

  &-name {
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 20px;
    color: #333;

    &.loading {
      height: 24px;
      width: 300px;
    }
  }

  &-description {
    color: #666;
    margin-bottom: 15px;

    &.loading {
      height: 32px;
      width: 100%;
    }
  }

  &-link {
    &.loading {
      height: 16px;
      width: 100%;
    }
  }
}

.loading {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #F6F6F6;
  background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%);
  background-size: 800px 104px;
  height: 96px;
  width: 100%;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}
</style>