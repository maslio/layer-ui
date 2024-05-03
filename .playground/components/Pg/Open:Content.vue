<script setup lang="ts">
const { loading, error } = defineProps<{
  loading?: boolean
  error?: boolean
  close: () => any
}>()
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
  <Card label="Label">
    <Item label="Hello 1" />
    <Item label="Hello 2" />
    <Item label="Next">
      <PgOpen:Content :close />
    </Item>
  </Card>
  <Button label="Close" color="positive" @click="close" />
</template>
