import React from "react";
import Navigation from "../src/components/Navigation";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import vendorsService from "../src/services/vendorsService";
import {
  Card,
  Grid,
  CardContent,
  Box,
  Container,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
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
    padding: theme.spacing(1),
  },
  videoCardPaper: {
    width: "100%",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

/**
export async function getServerSideProps() {
  
  const vendors = await vendorsService.getVendors({});
  return {
    props: {
      vendors,
    },
  };
}
 */

export async function getStaticProps() {

  const vendors = await vendorsService.getVendors({});
  return {
    props: {
      vendors,
    },
    revalidate: 1,
  };
}

export default function Index({ vendors }) {
  const classes = useStyles();
  return (
    <Container>
      {vendors.length > 0 && (
        <Box>
          <Box className={classes.root}>
            <Navigation basketList={[]} title="Inaya Organic Market" />
            <main className={classes.content}>
              <Box className={classes.toolbar} />
              <Grid container spacing={4}>
                {vendors.map((item, i) => (
                  <Grid item key={item} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <Link href={`/vendor/${item.id}`}>
                        <a>
                          <CardMedia
                            className={classes.cardMedia}
                            image={
                              item.fields.Logo.length > 0
                                ? item.fields.Logo[0].url
                                : "https://source.unsplash.com/random"
                            }
                            title={item.fields.Name}
                          />
                        </a>
                      </Link>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.fields.Name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link href={`/vendor/${item.id}`}>
                          <Button>View Items</Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </main>
          </Box>
        </Box>
      )}
    </Container>
  );
}
