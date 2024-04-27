import { kebabCase } from 'scule'

export default defineNuxtPlugin(({ $device }) => {
  const device = $device as Record<string, boolean>
  const classes = []
  for (const key in device as Record<string, boolean>) {
    if (key.startsWith('is') && device[key] === true)
      classes.push(kebabCase(key).slice(3))
  }
  useHead({
    bodyAttrs: {
      class: classes.join(' '),
    },
  })
})
