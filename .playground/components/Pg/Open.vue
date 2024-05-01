<script setup lang="ts">
import Content from './Open:Content.vue'
</script>

<template>
  <Card label="Next">
    <Item v-slot="{ close }" label="Content">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" label="Loading">
      <Content loading @close="close" />
    </Item>
    <Item v-slot="{ close }" label="Error">
      <Content error @close="close" />
    </Item>
  </Card>

  <Card label="Modal">
    <Item v-slot="{ close }" open="modal" label="Content">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="modal" label="Loading">
      <Content loading @close="close" />
    </Item>
    <Item v-slot="{ close }" open="modal" label="Error">
      <Content error @close="close" />
    </Item>
    <Item v-slot="{ close }" open="modal" label="Modal with header" open-header>
      <Content @close="close" />
    </Item>
  </Card>

  <Card label="Float">
    <Item v-slot="{ close }" open="float" label="Content">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" label="Loading">
      <Content loading @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" label="Error">
      <Content error @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" label="Float with header">
      <Content @close="close" />
    </Item>
  </Card>

  <Card label="Float placement">
    <Item v-slot="{ close }" open="float" open-placement="bottom-end" label="bottom-end">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" open-placement="top-end" label="top-end">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" open-placement="top-start" label="top-start">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="float" open-placement="bottom-start" label="bottom-start">
      <Content @close="close" />
    </Item>
  </Card>

  <Card label="Full">
    <Item v-slot="{ close }" open="full" label="Content">
      <Content @close="close" />
    </Item>
    <Item v-slot="{ close }" open="full" label="Loading">
      <Content loading @close="close" />
    </Item>
    <Item v-slot="{ close }" open="full" label="Error">
      <Content error @close="close" />
    </Item>
    <Item v-slot="{ close }" open="full" label="Fullscreen with header">
      <Content @close="close" />
    </Item>
  </Card>
</template>
