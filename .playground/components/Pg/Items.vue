<script setup lang="ts">
const shortString = 'Lorem ipsum'
const longString = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, eaque quia quaerat facilis soluta adipisci! Labore adipisci atque, facere, voluptates qui veniam quidem vero aut dignissimos voluptatibus accusantium ipsam commodi.'
</script>

<template>
  <Card :label="longString">
    <Item :label="shortString" :caption="shortString" />
    <Item :label="longString" :caption="longString" />
    <Item :label="longString" :caption="shortString" :value="shortString" />
    <Item :label="longString" :caption="longString" :value="longString" />
  </Card>
  <Card>
    <template #label>
      <div truncate>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore nostrum minus maiores, maxime doloremque adipisci consectetur vitae aperiam velit laudantium sit consequatur? Temporibus nisi corporis eligendi perferendis consequatur maiores quo!
      </div>
    </template>
    <Item icon="mdi:emoticon-happy" label="Item with icon" />
    <Item icon="tabler:click" label="Clickable" clickable />
    <Item icon="uit:google" label="Google.com" href="https://google.com" />
    <Item>
      <template #left>
        Left
      </template>
      <template #main>
        <div>Main</div>
      </template>
      <template #right>
        Right
      </template>
    </Item>
  </Card>
</template>
