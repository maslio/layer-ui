<script setup lang="ts">
const shortString = 'Lorem ipsum'
const longString = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, eaque quia quaerat facilis soluta adipisci! Labore adipisci atque, facere, voluptates qui veniam quidem vero aut dignissimos voluptatibus accusantium ipsam commodi.'
</script>

<template>
  <List label="Label prop">
    <Item :label="shortString" />
    <Item :label="longString" />
    <Item :label="shortString" :caption="shortString" />
    <Item :label="shortString" :caption="longString" />
    <Item :label="longString" :caption="shortString" />
    <Item :label="longString" :caption="longString" />
    <Item label="Item with icon" icon="mdi:emoticon-happy" />
  </List>
  <List>
    <template #label>
      <div truncate>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore nostrum minus maiores, maxime doloremque adipisci consectetur vitae aperiam velit laudantium sit consequatur? Temporibus nisi corporis eligendi perferendis consequatur maiores quo!
      </div>
    </template>
    <Item label="Clickable" clickable />
    <Item label="Next" next />
  </List>

  <List label="Json">
    <ItemJson :data="{ hello: 'world' }" />
  </List>
</template>
