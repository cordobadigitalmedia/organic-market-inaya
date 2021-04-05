import React from "react";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
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
  priceText: {
    fontWeight: "bold",
    color: "#000",
  },
  listTitle: {
    textTransform: "capitalize",
  },
}));

export default function ProductList(props) {
  const classes = useStyles();
  const { products, mode, onAddItem } = props;
  const addItem = (item) => {
    onAddItem({ mode: mode, item: item });
  };
  return (
    <List>
      {products.map((item, i) => (
        <>
          <ListItem key={i} className={classes.listitem}>
            <ListItemAvatar>
              <>
                {"image" in item.fields && item.fields.image.length > 0 ? (
                  <Avatar
                    variant="square"
                    className={classes.avatar}
                    src={item.fields.image[0].url}
                  />
                ) : (
                  <Avatar variant="square">{`${i + 1}`}</Avatar>
                )}
              </>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div className={classes.listTitle}>{item.fields.Name}</div>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <div className={classes.priceText}>
                    {`Price/Kg: ${item.fields["Price / Kg"]} JOD`}
                  </div>
                  <div component="form" className={classes.manageProduct}>
                    <IconButton
                      aria-label="add"
                      className={classes.iconBtn}
                      onClick={() => addItem(item)}
                    >
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="remove" className={classes.iconBtn}>
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
  );
}
