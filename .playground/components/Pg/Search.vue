<script setup lang="ts">
interface User {
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

async function search(input: string) {
  const users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
  if (input.length) {
    const filterUsers = users.filter(user => user.name.toLowerCase().includes(input.toLowerCase()))
    return {
      items: filterUsers,
      count: filterUsers.length,
    }
  }
  return {
    items: users,
    count: users.length,
  }
}
</script>

<template>
  <Search v-slot="{ item: user }" :search eager>
    <Open :label="user.name" target="next">
      <Item clickable>
        <template #label>
          <div>{{ user.name }}</div>
          <div text-xs text-faint>
            {{ user.company.name }}
          </div>
        </template>
      </Item>
      <template #target>
        <List>
          <InputString label="Name" :model-value="user.name" />
          <InputString label="Username" :model-value="user.username" />
        </List>
        <List>
          <InputString label="Email" :model-value="user.email" />
          <InputString label="Phone" :model-value="user.phone" />
          <InputString label="Website" :model-value="user.website" />
        </List>
        <List>
          <Open target="next" label="Address">
            <Item next label="Address" :caption="`${user.address.city}, ${user.address.street}`" />
            <template #target>
              <List>
                <InputString label="Street" :model-value="user.address.street" />
                <InputString label="Suite" :model-value="user.address.suite" />
                <InputString label="City" :model-value="user.address.city" />
                <InputString label="Zipcode" :model-value="user.address.zipcode" />
              </List>
              <List>
                <Item label="Location" next :caption="`${user.address.geo.lat}, ${user.address.geo.lng}`" />
              </List>
            </template>
          </Open>
          <Open target="next" label="Company">
            <Item next label="Company" :caption="user.company.name" />
            <template #target>
              <List>
                <InputString label="Name" :model-value="user.company.name" />
                <InputString label="Catch Phrase" :model-value="user.company.catchPhrase" />
                <InputString label="Bs" :model-value="user.company.bs" />
              </List>
            </template>
          </Open>
        </List>
      </template>
    </Open>
  </Search>
</template>
