import React from "react";
import Container from "@material-ui/core/Container";
import Navigation from "../src/Navigation";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import utilStyles from "../styles/utils.module.css";
import vendorsService from "../src/services/vendorsService";
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

export async function getServerSideProps() {
  const vendors = await vendorsService.getVendors({});
  return {
    props: {
      vendors,
    },
  };
}

export default function Index({ vendors }) {
  console.log(vendors);
  const classes = useStyles();
  return (
    <Container>
      {vendors.length > 0 && (
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
                      Organic Produce Vendors
                    </div>
                  }
                />
                <CardContent>
                  <List>
                    {vendors.map((item, i) => (
                      <ListItem button key={i}>
                        <ListItemAvatar>
                          {item.fields.Logo.length > 0 ? (
                            <Avatar src={item.fields.Logo[0].url} />
                          ) : (
                            <Avatar>{`${i + 1}`}</Avatar>
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Link href={`/vendor/${item.id}`}>
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
