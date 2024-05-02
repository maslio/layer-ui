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

async function items(input: string, limit: number) {
  let users = await $fetch<User[]>('https://jsonplaceholder.typicode.com/users')
  if (input) {
    input = input.toLowerCase()
    users = users.filter(user => user.name.toLowerCase().includes(input))
  }
  return {
    total: users.length,
    items: users.slice(0, limit),
  }
}
</script>

<template>
  <List v-slot="{ item: user }" :items="items" keys="id" total input>
    <Item :label="user.name" :caption="user.company.name">
      <Card>
        <InputString label="Name" :model-value="user.name" />
        <InputString label="Username" :model-value="user.username" />
      </Card>
      <Card>
        <InputString label="Email" :model-value="user.email" />
        <InputString label="Phone" :model-value="user.phone" />
        <InputString label="Website" :model-value="user.website" />
      </Card>
      <Card>
        <Item label="Address" :value="`${user.address.city}, ${user.address.street}`">
          <Card>
            <InputString label="Street" :model-value="user.address.street" />
            <InputString label="Suite" :model-value="user.address.suite" />
            <InputString label="City" :model-value="user.address.city" />
            <InputString label="Zipcode" :model-value="user.address.zipcode" />
          </Card>
          <Card>
            <Item label="Location" :caption="`${user.address.geo.lat}, ${user.address.geo.lng}`" />
          </Card>
        </Item>
        <Item label="Company" :value="user.company.name">
          <Card>
            <InputString label="Name" :model-value="user.company.name" />
            <InputString label="Catch Phrase" :model-value="user.company.catchPhrase" />
            <InputString label="Bs" :model-value="user.company.bs" />
          </Card>
        </Item>
      </Card>
    </Item>
  </List>
</template>
