<template>
  <Layout label="Ui components">
    <List>
      <Open label="List and Items">
        <Item label="List and Items" next icon="material-symbols:lists-rounded" />
        <template #target>
          <PgItems />
        </template>
      </Open>
      <Open label="Inputs">
        <Item label="Inputs" next icon="ic:round-input" />
        <template #target>
          <PgInputs />
        </template>
      </Open>
      <Open label="Buttons">
        <Item label="Buttons" next icon="mdi:button-pointer" />
        <template #target>
          <PgButtons />
        </template>
      </Open>
      <Open label="Search">
        <Item label="Search" next icon="search" />
        <template #target>
          <PgSearch />
        </template>
      </Open>
    </List>

    <List label="Layout">
      <Open label="Buttons">
        <Item label="Layout buttons" next icon="mdi:gesture-tap-button" />
        <template #target>
          <PgLayoutButtons />
        </template>
      </Open>
      <Open label="Open">
        <Item label="Open" next icon="material-symbols:open-in-new" />
        <template #target>
          <PgOpen />
        </template>
      </Open>
    </List>

    <List label="Color mode">
      <PgColorMode />
    </List>
  </Layout>
</template>
