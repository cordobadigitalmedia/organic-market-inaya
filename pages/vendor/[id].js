import React from "react";
import Navigation from "../../src/components/Navigation";
import {
  Box,
  Typography,
  Container,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import productsService from "../../src/services/productsService";
import vendorsService from "../../src/services/vendorsService";
import ProductList from "../../src/components/ProductList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { defaultPriceType } from "../../src/utils/constants";

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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "recVvqzqsYgyEGAzM" } },
      { params: { id: "recZL5KJlGOhbnySl" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  let products = [];
  const vendor = await vendorsService.getVendors({
    filter: "recordid = '" + id + "'",
  });
  products = await productsService.getProducts({
    filter: "Vendorid = '" + id + "'",
  });
  return {
    props: {
      products,
      vendor,
      id,
    },
    revalidate: 1,
  };
}

export default function Vendor({ products, vendor }) {
  const classes = useStyles();
  let categories = [];
  let priceType = defaultPriceType;
  if (Array.isArray(vendor) && vendor.length > 0 && vendor[0].fields.useCategories) {
    categories = [
      ...new Set(products.map((product) => product.fields.Category)),
    ];
  }
  if (Array.isArray(vendor) && vendor.length > 0 && "Price Type" in vendor[0].fields) {
    priceType = vendor[0].fields["Price Type"];
  }
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container>
      {Array.isArray(products) && products.length > 0 && (
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
              {categories.length > 0 ? (
                <Box>
                  {categories.map((category, i) => (
                    <Accordion
                      key={i}
                      expanded={expanded === i}
                      onChange={handleChange(i)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${i}-content`}
                        id={`panel${i}-header`}
                      >
                        <Typography>{category}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ProductList
                          products={products.filter(
                            (product) => product.fields.Category === category
                          )}
                          priceType={priceType}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              ) : (
                <ProductList products={products} priceType={priceType} />
              )}
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
