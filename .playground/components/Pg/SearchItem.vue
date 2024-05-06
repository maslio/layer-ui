<script setup lang="ts">
import type { User } from './Search.vue'

const { item: user } = defineProps<{
  item: User
}>()
</script>

<template>
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
</template>
