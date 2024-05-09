<script setup lang="ts">

</script>

<template>
  <Layout label="UI Playground">
    <Card>
      <PlaygroundItem
        component="Button"
        label="Button colors"
        :props="{ label: 'Button' }"
        :options="[
          { props: { color: 'default' } },
          { props: { color: 'contrast' } },
          { props: { color: 'primary' } },
          { props: { color: 'positive' } },
          { props: { color: 'negative' } },
        ]"
      />
    </Card>
  </Layout>
<!--
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
  </Playground> -->
</template>
