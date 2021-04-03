import React from "react";
import Container from "@material-ui/core/Container";
import Navigation from "../../src/Navigation";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import utilStyles from "../../styles/utils.module.css";
import productsService from "../../src/services/productsService";
import vendorsService from "../../src/services/vendorsService";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";

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
  iconBtn: {
    padding: 0,
    margin: 0,
  },
  avatar: {
    padding: 0,
    paddingRight: theme.spacing(1),
    minWidth: 80,
    minHeight: 80,
  },
  listitem: {
    padding: 0,
    margin: 0,
  },
  manageProduct: {
    padding: 0,
    margin: 0,
    display: "flex",
    alignItems: "left",
  },
  videoCardPaper: {
    width: "100%",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  priceText: {
    fontWeight: "bold",
    color: "#000",
  },
  listTitle: {
    textTransform: "capitalize",
  },
}));

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const vendor = await vendorsService.getVendors({
    filter: "recordid = '" + id + "'",
  });
  console.log(vendor);
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

export default function Index({ products, vendor }) {
  const classes = useStyles();
  return (
    <Container>
      {products.length > 0 && (
        <Box>
          <Box className={classes.root}>
            <Navigation />
            <main className={classes.content}>
              <Box className={classes.toolbar} />
              <div className={utilStyles.headingLgLight}>
                {vendor[0].fields.Name}
              </div>
              <List>
                {products.map((item, i) => (
                  <>
                    <ListItem key={i} className={classes.listitem}>
                      <ListItemAvatar>
                        <>
                          {"image" in item.fields &&
                          item.fields.image.length > 0 ? (
                            <Avatar
                              variant="square"
                              className={classes.avatar}
                              src={item.fields.image[0].url}
                            />
                          ) : vendor[0].fields.Logo.length > 0 ? (
                            <Avatar
                              variant="square"
                              className={classes.avatar}
                              src={vendor[0].fields.Logo[0].url}
                            />
                          ) : (
                            <Avatar variant="square">{`${i + 1}`}</Avatar>
                          )}
                        </>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <div className={classes.listTitle}>
                              {item.fields.Name}
                            </div>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <div className={classes.priceText}>
                              {`Price/Kg: ${item.fields["Price / Kg"]} JOD`}
                            </div>
                            <div
                              component="form"
                              className={classes.manageProduct}
                            >
                              <IconButton
                                aria-label="add"
                                className={classes.iconBtn}
                              >
                                <AddCircleIcon fontSize="large" />
                              </IconButton>
                              <IconButton
                                aria-label="remove"
                                className={classes.iconBtn}
                              >
                                <RemoveCircleIcon fontSize="large" />
                              </IconButton>
                            </div>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </>
                ))}
              </List>
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
