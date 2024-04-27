<script setup lang="ts">
const { collection } = defineProps<{
  collection: string
}>()
const limit = 10
const model = defineModel<Item>({ required: true })
async function search(value: string, limit: number) {
  const query = {
    fields: ['id', 'name'],
    search: value,
    limit,
  }
  return {
    items: await readItems(collection, query),
    count: await countItems(collection, query),
  }
}
function select(item: Item) {
  model.value = item
}
function deselect(item: Item) {
  return item
}
</script>

<template>
  <List label="Выбрано">
    <InputOption
      :label="model.name"
      :model-value="true"
      @update:model-value="deselect(model)"
    />
  </List>
  <Search v-slot="{ item }" :search :limit autofocus-first eager>
    <InputOption
      :label="item.name"
      :model-value="model && model.id === item.id"
      @update:model-value="select(item)"
    />
  </Search>
</template>
