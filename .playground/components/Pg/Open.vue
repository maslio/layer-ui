<script setup lang="ts">
import Content from './Open:Content.vue'
</script>

<template>
  <List label="Next">
    <Open target="next" label="Content">
      <Item label="Content" next />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="next" label="Loading">
      <Item label="Loading" next />
      <template #target="{ close }">
        <Content loading @close="close" />
      </template>
    </Open>
    <Open target="next" label="Error">
      <Item label="Error" next />
      <template #target="{ close }">
        <Content error @close="close" />
      </template>
    </Open>
  </List>

  <List label="Modal">
    <Open target="modal">
      <Item label="Content" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="modal">
      <Item label="Loading" clickable />
      <template #target="{ close }">
        <Content loading @close="close" />
      </template>
    </Open>
    <Open target="modal">
      <Item label="Error" clickable />
      <template #target="{ close }">
        <Content error @close="close" />
      </template>
    </Open>
    <Open target="modal" label="Modal with header">
      <Item label="With header" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
  </List>

  <List label="Float">
    <Open target="float">
      <Item label="Content" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="float">
      <Item label="Loading" clickable />
      <template #target="{ close }">
        <Content loading @close="close" />
      </template>
    </Open>
    <Open target="float">
      <Item label="Error" clickable />
      <template #target="{ close }">
        <Content error @close="close" />
      </template>
    </Open>
    <Open target="float" label="Float with header">
      <Item label="With Header" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
  </List>

  <List label="Float placement">
    <Open target="float" placement="bottom-end">
      <Item label="Bottom end" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="float" placement="top-end">
      <Item label="Top end" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="float" placement="top-start">
      <Item label="Top start" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="float" placement="bottom-start">
      <Item label="Bottom start" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
  </List>

  <List label="Fullscreen">
    <Open target="fullscreen">
      <Item label="Content" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
    <Open target="fullscreen">
      <Item label="Loading" clickable />
      <template #target="{ close }">
        <Content loading @close="close" />
      </template>
    </Open>
    <Open target="fullscreen">
      <Item label="Error" clickable />
      <template #target="{ close }">
        <Content error @close="close" />
      </template>
    </Open>
    <Open target="fullscreen" label="Fullscreen with header">
      <Item label="With header" clickable />
      <template #target="{ close }">
        <Content @close="close" />
      </template>
    </Open>
  </List>
</template>
