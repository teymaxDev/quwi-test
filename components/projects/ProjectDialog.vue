<template>
  <Dialog v-model="open" class="project-dialog">
    <template #header>
      {{ editing ? 'Edit' : 'Create' }} project
    </template>
    <template #body>
      <TextField
        v-model="name"
        placeholder="Project name"
        :error="error"
        @clear-error="clearErrors"
      />
    </template>
    <template #actions>
      <Btn
        v-if="editing"
        sm
        text
        :loading="deleting"
        :disabled="deleting || loading"
        class="btn-error"
        @click="deleteProject"
      >
        Delete
      </Btn>
      <Btn
        sm
        :loading="loading"
        :disabled="deleting || loading"
        @click="projectAction"
      >
        {{ editing ? 'Save' : 'Create' }}
      </btn>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
// @ts-ignore
import { Project } from '~/types'
import TextField from '~/components/TextField.vue'
import Dialog from '~/components/Dialog.vue'
import Btn from '~/components//Btn.vue'

export default Vue.extend({
  name: 'ProjectDialog',
  components: {
    TextField,
    Dialog,
    Btn
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    project: {
      type: [Object, null] as PropType<Project>,
      default: null
    }
  },
  data: () => ({
    name: '',
    loading: false,
    deleting: false,
    error: ''
  }),
  computed: {
    open: {
      get (): boolean {
        return this.value
      },
      set (v: boolean) {
        this.$emit('input', v)
        !v && (this.name = '')
      }
    },
    editing (): boolean {
      return !!this.project
    }
  },
  watch: {
    project: {
      immediate: true,
      handler (p) {
        if (p) {
          this.name = this.project?.name || ''
          this.error = ''
          this.loading = false
          this.deleting = false
        }
      }
    }
  },
  methods: {
    cancel () {
      this.open = false
    },
    clearErrors () {
      this.error = ''
    },
    projectAction () {
      if (this.editing) {
        this.updateProject()
      } else {
        this.createProject()
      }
    },
    async createProject () {
      this.loading = true
      try {
        await this.$store.dispatch('projects/createProject', {
          name: this.name
        })
        this.open = false
      } catch (err) {
        this.error = err as unknown as string
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async updateProject () {
      this.loading = true
      try {
        await this.$store.dispatch('projects/updateProject', {
          data: {
            name: this.name
          },
          id: this.project.id
        })
        this.open = false
      } catch (err) {
        this.error = err as unknown as string
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async deleteProject (): Promise<void> {
      const confirmed = confirm('Are you sure you want to delete this project?')
      if (!confirmed) {
        return
      }
      try {
        this.deleting = true
        await this.$store.dispatch('projects/deleteProject', this.project.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.open = false
        this.deleting = false
      }
    }
  }
})
</script>

<style lang="scss">
.project-dialog .btn-error,
.project-dialog .btn-error:hover {
  color: $error;
  .btn__text {
    color: $error;
  }
}
</style>
