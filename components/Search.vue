<!-- eslint-disable ts/no-use-before-define -->
<script setup lang="ts">
export interface Props {
  label?: string
  limit?: number
  eager?: boolean
  search: (search: string, limit: number) => Promise<{ items: Item[], count: number }>
  autofocus?: boolean
  autofocusFirst?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  label: 'Поиск',
  limit: 5,
})
const itemsList = ref()
const text = ref('')

const focus = (function () {
  const active = ref(false)
  const index = ref<number>(-1)
  function focus(i: number) {
    if (data.items[i] || (data.hasMore && data.items.length === i))
      index.value = i
  }
  function next() {
    focus(index.value + 1)
  }
  function prev() {
    focus(index.value - 1)
  }
  function first() {
    focus(0)
  }
  function select() {
    itemsList.value.querySelector('.focused .clickable').click()
  }
  const rememberedIndex = ref(index.value)
  function remember() {
    rememberedIndex.value = index.value
  }
  function restore() {
    index.value = rememberedIndex.value
  }
  onKeyStroke(['ArrowDown', 'ArrowUp', 'Enter', 'Escape'], (e) => {
    if (!active.value)
      return
    e.preventDefault()
    if (e.key === 'ArrowDown')
      next()
    else if (e.key === 'ArrowUp')
      prev()
    else if (e.key === 'Enter')
      select()
    else if (e.key === 'Escape')
      text.value = ''
  })
  return toReactive({ active, index, first, remember, restore })
})()

const data = (function () {
  const limit = ref(props.limit)
  const items = ref<Item[]>([])
  const count = ref(0)
  const pending = ref(false)
  watch(text, async (value) => {
    if (!value.length && !props.eager) {
      items.value = []
      count.value = 0
      return
    }
    limit.value = props.limit
    exec()
  })
  async function exec() {
    pending.value = true
    const result = await props.search(text.value, limit.value)
    items.value = result.items
    count.value = result.count
    pending.value = false
    if (count.value && props.autofocusFirst)
      focus.first()
  }
  async function increaseLimit() {
    focus.remember()
    limit.value += props.limit
    await exec()
    focus.restore()
  }
  const hasMore = computed<number>(() => {
    if (!items.value.length)
      return 0
    if (count.value > items.value.length) {
      const more = count.value - items.value.length
      if (more > props.limit)
        return props.limit
      return more
    }
    return 0
  })
  return toReactive({ items, pending, count, increaseLimit, hasMore, exec })
})()

defineExpose({
  clear() {
    text.value = ''
  },
})

if (props.eager)
  await data.exec()
</script>

<template>
  <List>
    <InputString
      v-model.trim="text"
      :placeholder="label"
      :autofocus
      @focus="focus.active = true"
      @blur="focus.active = false"
    >
      <div v-if="data.pending">
        <Icon name="spinner" animate-spin />
      </div>
      <div v-else-if="text" flex items-center text-faint>
        <div v-if="data.count" mr-1 text-sm>
          Найдено: {{ data.count }}
        </div>
        <div v-else>
          Не найдено
        </div>
        <Item:Button icon="close" @click="text = ''" />
      </div>
    </InputString>
    <Separator v-if="data.items.length" />
    <div v-if="data.items.length && !data.pending" ref="itemsList">
      <div
        v-for="(item, index) in data.items" :key="index"
        class="decorator"
        :class="{ focused: (focus.active && index === focus.index) }"
      >
        <slot :item="item" />
      </div>
      <div
        v-if="data.hasMore"
        :class="{ focused: (focus.active && data.items.length === focus.index) }"
      >
        <Item clickable @click="data.increaseLimit">
          <template #label>
            <div text-center>
              Показать еще {{ data.hasMore }}
            </div>
          </template>
        </Item>
      </div>
    </div>
  </List>
</template>
