<script setup lang="ts">
const buttons = reactive({
  float: false,
  modal: false,
  next: false,
  action: false,
})

async function action() {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}
</script>

<template>
  <Menu>
    <Button v-if="buttons.float" flat mini icon="material-symbols:playlist-add-rounded" open="float">
      <Item label="Hello world" clickable />
      <Item label="Hello world" clickable />
      <Item label="Hello world" clickable />
      <Button label="Hello" />
    </Button>
    <Button v-if="buttons.modal" flat mini icon="material-symbols:playlist-add-rounded" open="modal">
      <Item label="Hello world" />
      <Item label="Hello world" />
      <Item label="Hello world" />
    </Button>
    <Button
      v-if="buttons.action"
      icon="material-symbols:playlist-add-rounded"
      flat mini
      :action
    />
    <Button v-if="buttons.next" flat mini icon="material-symbols:playlist-add-rounded" open="next" open-label="Button open">
      <Card>
        <Item label="Hello world" />
        <Item label="Hello world" />
        <Item label="Hello world" />
      </Card>
    </Button>
  </Menu>
  <Card>
    <InputToggle v-model="buttons.float" label="Button with float" />
    <InputToggle v-model="buttons.modal" label="Button with modal" />
    <InputToggle v-model="buttons.next" label="Button with next" />
    <InputToggle v-model="buttons.action" label="Button with action" />
  </Card>
</template>
