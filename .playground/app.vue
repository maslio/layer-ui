<script setup lang="ts">
const components = {
  Button: [
    { color: 'default', label: 'Button' },
    { color: 'contrast', label: 'Button' },
    { color: 'primary', label: 'Button' },
    { color: 'positive', label: 'Button' },
    { color: 'negative', label: 'Button' },
  ],
}
</script>

<template>
  <Playground label="UI" :components>
    <Card>
      <Item label="Items" icon="material-symbols:lists-rounded">
        <PgItems />
      </Item>
      <Item label="Inputs" icon="ic:round-input">
        <PgInputs />
      </Item>
      <Item label="Buttons" icon="mdi:button-pointer">
        <PgButtons />
      </Item>
      <Item label="Search" icon="search">
        <PgSearch />
      </Item>
    </Card>
    <Card>
      <Item label="Open" icon="material-symbols:open-in-new">
        <PgOpen />
      </Item>
    </Card>
    <Card>
      <PgColorMode />
    </Card>
  </Playground>
</template>
