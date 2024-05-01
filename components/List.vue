<script setup lang="ts" generic="T">
interface Item {
  key: string | number
  item: T
}
type Items = Item[] | { total: number, items: Item[] }
type ItemsFn = (input: string, limit: number, items: T[]) => Items | Promise<Items>

const props = withDefaults(defineProps<{
  label?: string
  caption?: string
  total?: boolean
  items?: Items | ItemsFn
  limit?: number
  limitIncrement?: number
  input?: boolean
  inputValue?: string
  inputFocus?: boolean
  inputLabel?: string
  inputDebounce?: number
}>(), {
  limit: 5,
  inputLabel: 'Search',
  inputDebounce: 300,
})
defineSlots<{
  default: (props: {
    item: T
    index: number
  }) => any
  label: () => any
}>()

const input = defineModel<string>({ default: '' })
watch(() => props.inputValue, (value) => {
  if (value != null)
    input.value = value
}, { immediate: true })

const list = ref<HTMLDivElement>()
const limit = ref(props.limit)
const items = ref<Item[]>([]) as Ref<Item[]>
const total = ref<number>(0)
const pending = ref(false)

function setItems(data: Items) {
  if (Array.isArray(data)) {
    items.value = data
    total.value = data.length
  }
  else {
    items.value = data.items
    total.value = data.total
  }
}

async function fetch(_limit = props.limit) {
  limit.value = _limit
  pending.value = true
  if (props.items) {
    if (typeof props.items === 'function') {
      const data = await props.items(input.value, limit.value, items.value.map(i => i.item))
      setItems(data)
    }
    else { setItems(props.items) }
  }
  pending.value = false
}

const increment = computed(() => props.limitIncrement ?? props.limit)
const hasMore = computed<number>(() => {
  if (!items.value.length)
    return 0
  if (total.value > items.value.length) {
    const more = total.value - items.value.length
    if (more > increment.value)
      return increment.value
    return more
  }
  return 0
})

const focus = (function () {
  const active = ref(false)
  const index = ref<number>(-1)
  function focus(i: number) {
    if (items.value[i] || (hasMore.value && items.value.length === i))
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
    const clickableEl = list.value?.querySelector('.focused .clickable') as HTMLElement
    clickableEl?.click()
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
      input.value = ''
  })
  return toReactive({ active, index, first, remember, restore })
})()

async function increaseLimit() {
  focus.remember()
  await fetch(limit.value + increment.value)
  focus.restore()
}

watch(props, () => fetch())
watchDebounced(input, () => fetch(), { debounce: props.inputDebounce })
defineExpose({
  fetch,
})
await fetch()
</script>

<template>
  <Card>
    <div
      ref="list"
      class="list overflow-hidden rounded-xl embeded:rounded-none"
      color="default"
    >
      <template v-if="$props.input">
        <InputString
          v-model="input"
          :placeholder="inputLabel"
          flat
          @focus="focus.active = true"
          @blur="focus.active = false"
        >
          <div v-if="pending">
            <Icon name="spinner" animate-spin />
          </div>
          <div v-else-if="input" flex items-center text-faint>
            <Item:Button icon="close" @click="input = ''" />
          </div>
        </InputString>
        <Separator />
      </template>
      <div
        v-for="(one, index) in items"
        :key="one.key"
        :class="{ focused: (focus.active && index === focus.index) }"
      >
        <slot :item="one.item" :index />
      </div>
      <template v-if="hasMore">
        <Separator />
        <div :class="{ focused: (focus.active && items.length === focus.index) }">
          <Item clickable @click="increaseLimit">
            <template #main>
              <div text-center>
                Show {{ hasMore }} more
              </div>
            </template>
          </Item>
        </div>
      </template>
    </div>
  </Card>
  <div v-if="props.total" m-2 text-center text-faint>
    Total: {{ total }}
  </div>
</template>

<style>
/* .label {
  --uno: mb-1 truncate px-3 text-base font-300 first: mt-0 text-faint;
}
.list + .list {
  --uno: mt-4;
}
.list + .buttons {
  --uno: mt-4;
}
.list > *:not(.list):last-child hr {
  display: none;
}
.list > .list {
  --uno: rounded-none;
}
.list {
  --uno: relative;
}*/
</style>
