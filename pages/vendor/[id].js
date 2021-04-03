import React from "react";
import Container from "@material-ui/core/Container";
import Navigation from "../../src/components/Navigation";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import utilStyles from "../../styles/utils.module.css";
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

//Add basket data to navigation and make react based on state and also make navigation open when changes happen

export default function Vendor({ products, vendor }) {
  const classes = useStyles();
  const [basketList, setBasketList] = React.useState([]);
  return (
    <Container>
      {products.length > 0 && (
        <Box>
          <Box className={classes.root}>
            <Navigation basketList={products} title={vendor[0].fields.Name} />
            <main className={classes.content}>
              <Box className={classes.toolbar} />
              <ProductList products={products} />
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
