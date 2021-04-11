import React from "react";
import Navigation from "../../src/components/Navigation";
import { Box, Typography, Container, Button } from "@material-ui/core";
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

  return (
    <Container>
      {products.length > 0 && (
        <Box>
          <Box className={classes.root}>
            <Navigation title={vendor[0].fields.Name} />
            <main className={classes.content}>
              <Box className={classes.toolbar} />
              {"Description" in vendor[0].fields &&
                vendor[0].fields.Description !== "" && (
                  <Box>
                    <Typography variant="body1" component="p">
                      {vendor[0].fields.Description}
                    </Typography>
                  </Box>
                )}
              <ProductList products={products} mode="list" />
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
