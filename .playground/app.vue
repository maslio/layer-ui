<script setup lang="ts">
const layout = ref()
</script>

<template>
  <Layout ref="layout" label="Ui components">
    <Menu>
      <Item label="Item in menu" clickable />
      <Item label="Next">
        <Item label="Hello" />
      </Item>
    </Menu>
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
      <PgFullscreen :layout />
    </Card>
    <Bottom>
      <Button color="primary" label="Primary" />
    </Bottom>
  </Layout>
</template>
