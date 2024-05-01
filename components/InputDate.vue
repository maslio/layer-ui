<script setup lang="ts">
import dt from 'dayjs'

defineProps<{
  label: string
  readonly?: boolean
}>()
const model = defineModel<string>({
  default: dt().format('YYYY-MM-DD'),
})
function onCalendarSelect(value: string) {
  model.value = value
}
const presets = presetsPoint()

const caption = computed(() => {
  const preset = presets.find(p => p.value.format('YYYY-MM-DD') === model.value)
  if (preset)
    return preset.label
  return dt(model.value).format('DD.MM.YYYY')
})
</script>

<template>
  <Item :label :caption>
    <template v-if="!readonly" #default>
      <Card>
        <div class="px-3 py-2 text-center">
          <label text-faint>Дата</label>
          <InputDate:Input v-model="model" />
        </div>
      </Card>
      <Card>
        <InputOption
          v-for="preset in presets" :key="preset.label"
          v-model="model"
          :label="preset.label"
          :caption="preset.value.format('DD.MM.YYYY')"
          :value="preset.value.format('YYYY-MM-DD')"
        />
      </Card>
      <InputDate:Calendar :selected="[model]" @select="onCalendarSelect" />
    </template>
  </Item>
</template>
