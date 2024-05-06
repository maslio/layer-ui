<script setup lang="ts">
const { loading, error } = defineProps<{
  loading?: boolean
  error?: boolean
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

const { close } = useLayout()
</script>

<template>
  <Card label="Label">
    <Item label="Hello 1" />
    <Item label="Hello 2" />
    <Item label="Next">
      <PgOpenContent />
    </Item>
  </Card>
  <Button label="Close" color="positive" @click="close" />
</template>
