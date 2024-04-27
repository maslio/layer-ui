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
    <Open v-if="buttons.float" target="float">
      <Button flat mini icon="material-symbols:playlist-add-rounded" />
      <template #target>
        <List>
          <Item label="Hello world" clickable />
          <Item label="Hello world" clickable />
          <Item label="Hello world" clickable />
        </List>
        <Button label="Hello" />
      </template>
    </Open>
    <Open v-if="buttons.modal" target="modal">
      <Button flat mini icon="material-symbols:playlist-add-rounded" />
      <template #target>
        <List>
          <Item label="Hello world" />
          <Item label="Hello world" />
          <Item label="Hello world" />
        </List>
      </template>
    </Open>
    <Button
      v-if="buttons.action"
      icon="material-symbols:playlist-add-rounded"
      flat mini
      :action
    />
    <Open v-if="buttons.next" target="next">
      <Button flat mini icon="material-symbols:playlist-add-rounded" />
      <template #target>
        <List>
          <Item label="Hello world" />
          <Item label="Hello world" />
          <Item label="Hello world" />
        </List>
      </template>
    </Open>
  </Menu>
  <List>
    <InputToggle v-model="buttons.float" label="Button with float" />
    <InputToggle v-model="buttons.modal" label="Button with modal" />
    <InputToggle v-model="buttons.next" label="Button with next" />
    <InputToggle v-model="buttons.action" label="Button with action" />
  </List>
</template>
