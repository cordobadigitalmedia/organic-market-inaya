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
    padding: theme.spacing(3),
  },
  videoCardPaper: {
    width: "100%",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
  },
}));

/**
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: 'recVvqzqsYgyEGAzM' } },
      { params: { id: 'recZL5KJlGOhbnySl' } }
    ],
    fallback: true
  }
}
 */


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
}

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
              <Card className={classes.videoCardPaper}>
                <CardHeader
                  className={classes.cardHeader}
                  title={
                    <div className={utilStyles.headingLgLight}>
                      {vendor[0].fields.Name}
                    </div>
                  }
                />
                <CardContent>
                  <List>
                    {products.map((item, i) => (
                      <ListItem button key={i}>
                        <ListItemAvatar>
                          <div>
                            {"image" in item.fields &&
                            item.fields.image.length > 0 ? (
                              <Avatar src={item.fields.image[0].url} />
                            ) : vendor[0].fields.Logo.length > 0 ? (
                              <Avatar src={vendor[0].fields.Logo[0].url} />
                            ) : (
                              <Avatar>{`${i + 1}`}</Avatar>
                            )}
                          </div>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Link href={`/product/${item.id}`}>
                                <div className={utilStyles.buttonText}>
                                  {item.fields.Name}
                                </div>
                              </Link>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
