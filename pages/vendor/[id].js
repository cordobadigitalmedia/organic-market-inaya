import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
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
  const [basketList, setBasketList] = useState([]);
  const [myProducts, setmyProducts] = useState([]);
  const [count, setCount] = useState(0);

  const addItemToBasket = (params) => {
    let currentBasket = basketList;
    const matchIndex = currentBasket.findIndex(
      (item) => item.id === params.item.id
    );
    if (matchIndex > -1) {
      currentBasket[matchIndex].count += 1;
    } else {
      currentBasket.push(params.item);
    }
    setBasketList(currentBasket);
    setCount(count + 1);
  };
  const removeItemToBasket = (params) => {
    let currentBasket = basketList;
    const matchIndex = currentBasket.findIndex(
      (item) => item.id === params.item.id
    );
    if (matchIndex > -1) {
      if (currentBasket[matchIndex].count === 1) {
        currentBasket.splice(matchIndex,1);
      } else {
        currentBasket[matchIndex].count -= 1;
      }
      setBasketList(currentBasket);
    } 
    setCount(count + 1);
  };

  useEffect((count) => {
    if (products.length > 0) {
      const productsWithCount = products.map((product) => {
        let updatedProd = product;
        updatedProd.count = 1;
        return updatedProd;
      });
      setmyProducts(productsWithCount);
    }
  },[count]);

  return (
    <Container>
      {myProducts.length > 0 && (
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
                products={myProducts}
                onAddItem={addItemToBasket}
                onRemoveItem={removeItemToBasket}
                mode="list"
              />
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
