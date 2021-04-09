import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import Navigation from "../../src/components/Navigation";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import productsService from "../../src/services/productsService";
import vendorsService from "../../src/services/vendorsService";
import ProductList from "../../src/components/ProductList";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const vendor = await vendorsService.getVendors({
    filter: "recordid = '" + id + "'",
  });
  const products = await productsService.getProducts({
    filter: "Vendorid = '" + id + "'",
  });
  return {
    props: {
      products,
      vendor,
      id,
    },
  };
};

export default function Vendor({ products, vendor }) {
  const classes = useStyles();
  const [basketList, setBasketList] = useState([]);
  const [count, setCount] = useState(0);

  return (
    <Container>
      {products.length > 0 && (
        <Box>
          <Box className={classes.root}>
            {basketList !== null && (
              <Navigation
                basketList={basketList}
                title={vendor[0].fields.Name}
              />
            )}
            <main className={classes.content}>
              <Box className={classes.toolbar} />
              <ProductList
                products={products}
                mode="list"
              />
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
