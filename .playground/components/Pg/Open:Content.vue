<script setup lang="ts">
const { loading, error } = defineProps<{
  loading?: boolean
  error?: boolean
}>()
const emit = defineEmits(['close'])
if (loading) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
if (error) {
  await new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    setTimeout(() => { reject('Error') }, 1000)
  })
}
</script>

<template>
  <List label="Label">
    <Item label="Hello 1" />
    <Item label="Hello 2" />
    <Open label="Next">
      <Item label="Next" next />
      <template #target>
        <PgOpen:Content @close="emit('close')" />
      </template>
    </Open>
  </List>
  <Button label="Close" color="primary" @click="emit('close', $event)" />
</template>
