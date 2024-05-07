<script setup lang="ts">
import delay from 'delay'
import { sortBy } from 'lodash-es'

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
interface Query {
  sort: string & keyof User
}

const query = reactive<Query>({
  sort: 'id',
})
async function items(input: string, limit: number) {
  await delay(500)
  let users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
  if (input) {
    input = input.toLowerCase()
    users = users.filter(user => user.name.toLowerCase().includes(input))
  }
  users = sortBy(users, query.sort)
  return {
    total: users.length,
    items: users.slice(0, limit),
  }
}
const SearchItem = defineAsyncComponent(() => import('./SearchItem.vue'))
</script>

<template>
  <Menu v-slot="{ close }" label="Sort By">
    <InputOption v-model="query.sort" value="id" label="ID" @update:model-value="close" />
    <InputOption v-model="query.sort" value="name" label="Name" @update:model-value="close" />
  </Menu>
  <List
    :items keys="id"
    :query
    :component="SearchItem"
    total input
  />
</template>
