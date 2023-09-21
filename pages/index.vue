<template>
  <div class="container projects-container">
    <template v-if="projects.length">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @click="selectProject"
      />
      <div class="projects-container__create">
        <Btn label="Create Project" sm @click="createProject" />
      </div>
    </template>
    <template v-else>
      <div class="projects-container__empty">
        <Btn label="Create project" sm @click="createProject" />
      </div>
    </template>
    <ProjectDialog v-model="projectDialog" :project="selectedProject" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { Project } from '~/types'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import ProjectDialog from '~/components/projects/ProjectDialog.vue'
import Btn from '~/components/Btn.vue'

export default Vue.extend({
  name: 'HomePage',
  components: {
    ProjectCard,
    Btn,
    ProjectDialog
  },
  layout: 'default',
  middleware: ['auth'],
  async asyncData ({ store }) {
    if (store.getters['user/authenticated']) {
      await store.dispatch('projects/getProjects')
    }
  },
  data: () => ({
    projectDialog: false,
    selectedProjectId: null
  }),
  computed: {
    ...(mapState('projects', {
      projects: (state: any) => state.projects
    })),
    selectedProject (): Project | null {
      return this.projects.find((p: Project) => p.id === this.selectedProjectId) || null
    }
  },
  watch: {
    projectDialog (v) {
      !v && (this.selectedProjectId = null)
    }
  },
  methods: {
    createProject () {
      this.projectDialog = true
    },
    async selectProject (id: string) {
      this.selectedProjectId = id
      await this.$nextTick()
      this.projectDialog = true
    }
  }
})
</script>

<style lang="scss">
.projects-container {
  &__empty,
  &__create {
    display: flex;
    align-items: center;
  }
  &__empty {
    justify-content: space-between;
  }
  &__create {
    justify-content: flex-end;
  }
}
</style>
