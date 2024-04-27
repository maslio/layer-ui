<script setup lang="ts">
async function action() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello world')
    }, 100)
  })
}
</script>

<template>
  <Label>Colors</Label>
  <Button label="Default" color="default" />
  <Button label="Contrast" color="contrast" />
  <Button label="Primary" color="primary" />
  <Button label="Positive" color="positive" />
  <Button label="Negative" color="negative" />
  <Button icon="search" />
  <!-- <Buttons>
    <Button label="Default" color="default" />
    <Button label="Contrast" color="contrast" />
    <Button label="Primary" color="primary" />
    <Button label="Positive" color="positive" />
    <Button label="Negative" color="negative" />
    <Button icon="search" />
  </Buttons> -->
  <Label>Actions</Label>

  <Button :action label="Action" />
  <Open target="modal">
    <Button label="Modal" />
    <template #target>
      <div color="default" ma-3 text-center>
        Hello world
      </div>
      <Button :action label="Action" />
      <Button :action label="Action" />
    </template>
  </Open>
  <Open target="float">
    <Button label="Float" />
    <template #target>
      <div color="default" ma-3 text-center>
        Hello world
      </div>
      <Button :action label="Action" />
      <Button :action label="Action" />
    </template>
  </Open>
</template>
