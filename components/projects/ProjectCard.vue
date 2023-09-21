<template>
  <div v-ripple="'#2668c1'" class="project-card" @click="projectClick">
    <div class="project-card__logo">
      <img src="~/assets/img/project_logo.png" alt="project-logo">
    </div>
    <div class="project-card__title">
      {{ project.name }}
    </div>
    <div class="project-card__status">
      Active
    </div>
    <div class="project-card__stats">
      <div>
        <span>Time this week </span>
        <span>00:00:00</span>
      </div>
      <div>
        <span>This month</span>
        <span>00:00:00</span>
      </div>
      <div>
        <span>Total</span>
        <span>00:00:00</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
// @ts-ignore
import { Project } from '~/types'

export default Vue.extend({
  name: 'ProjectCard',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true
    }
  },
  methods: {
    projectClick () {
      this.$emit('click', this.project.id)
    }
  }
})
</script>

<style lang="scss">
.project-card {
  width: 600px;
  display: flex;
  align-items: center;
  background: white;
  justify-content: space-between;
  margin-bottom: 20px;
  border: 1px solid lightgray;
  padding: 25px 25px;
  gap: 40px;
  border-radius: 6px;
  cursor: pointer;
  &__logo {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 50%;
    border: thin solid lightgray;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center center;
      width: 100%;
      height: 100%;
    }
  }
  &__title,
  &__status {
    font-size: 18px;
    text-align: start;
  }
  &__title {
    flex-grow: 1;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__status {
    color: green;
    flex-shrink: 1;
  }
  &__stats {
    flex-grow: 1;
    width: 200px;
    div {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      & > span:last-child {
        font-weight: 600;
      }
    }
  }
}
</style>
