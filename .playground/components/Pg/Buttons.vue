<script setup lang="ts">
async function action() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello world')
    }, 100)
  })
}
</script>

<template>
  <Button label="Default" color="default" />
  <Button label="Contrast" color="contrast" />
  <Button label="Primary" color="primary" />
  <Button label="Positive" color="positive" />
  <Button label="Negative" color="negative" />
  <Button icon="search" />
  <div class="flex items-center justify-end gap-3">
    <Button mini icon="close" />
    <Button mini icon="close" />
    <Button mini icon="close" />
    <Button mini icon="close" />
  </div>

  <Label>Actions</Label>
  <Button :action label="Action" />
  <Button label="Modal" :open="{ target: 'modal', placement: 'page-bottom' }">
    <Button :action label="Action" />
    <Button :action label="Action" />
  </Button>
  <Button label="Dialog" open="dialog">
    <Button :action label="Action" />
    <Button :action label="Action" />
  </Button>
</template>
