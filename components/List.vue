<!-- eslint-disable ts/no-use-before-define -->
<script setup lang="ts" generic="T">
import { sumBy } from 'lodash-es'

type Items = T[] | { total: number, items: T[] }
type ItemsFn = (input: string, limit: number, items: T[]) => Items | Promise<Items>

const props = withDefaults(defineProps<{
  label?: string
  caption?: string
  total?: boolean
  items?: Items | ItemsFn
  keys: string & keyof T
  limit?: number
  limitIncrement?: number
  input?: boolean
  inputValue?: string
  inputFocus?: boolean
  inputLabel?: string
  inputDebounce?: number
  query?: any
}>(), {
  limit: 5,
  inputLabel: 'Search',
  inputDebounce: 300,
})
defineSlots<{
  default: (props: {
    item: T
    index: number
    selected?: Ref<boolean>
  }) => any
  label: () => any
}>()

const input = defineModel<string>({ default: '' })
watch(() => props.inputValue, (value) => {
  if (value != null)
    input.value = value
}, { immediate: true })

const list = ref<HTMLDivElement>()

const data = (function () {
  const limit = ref(props.limit)
  const items = ref<T[]>([]) as Ref<T[]>
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
        const data = await props.items(input.value, limit.value, items.value)
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
  async function increaseLimit() {
    focus.remember()
    await fetch(limit.value + increment.value)
    focus.restore()
  }
  watch(props, () => fetch())
  watchDebounced(input, () => fetch(), { debounce: props.inputDebounce })
  return toReactive({ input, items, total, pending, fetch, increment, hasMore, increaseLimit })
})()

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

defineExpose({ fetch: data.fetch })
await data.fetch()
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
          <div v-if="data.pending">
            <Icon name="spinner" animate-spin />
          </div>
          <div v-else-if="input" flex items-center text-faint>
            <Item:Button icon="close" @click="input = ''" />
          </div>
        </InputString>
        <Separator />
      </template>
      <div
        v-for="(item, index) in data.items"
        :key="item[props.keys] as string"
        :class="{ focused: (focus.active && index === focus.index) }"
        class="flex children:flex-1"
      >
        <slot :item="item" :index />
      </div>
      <template v-if="data.hasMore">
        <Separator />
        <div :class="{ focused: (focus.active && data.items.length === focus.index) }">
          <Item clickable @click="data.increaseLimit">
            <template #main>
              <div text-center>
                Show {{ data.hasMore }} more
              </div>
            </template>
          </Item>
        </div>
      </template>
    </div>
  </Card>
  <div v-if="props.total" m-2 text-center text-faint>
    Total: {{ data.total }}
  </div>
</template>
