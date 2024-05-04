<template>
  <Layout label="Ui components">
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
      <Item label="Layout buttons" icon="mdi:gesture-tap-button">
        <PgLayoutButtons />
      </Item>
      <Item label="Open" icon="material-symbols:open-in-new">
        <PgOpen />
      </Item>
    </Card>
    <Card>
      <PgColorMode />
    </Card>
    <Footer>
      <Button label="Button in footer" />
    </Footer>
  </Layout>
</template>
