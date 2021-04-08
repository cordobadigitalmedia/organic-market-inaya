import React, { useState, useEffect } from "react";
import {
  ListItemAvatar,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircle, RemoveCircle } from "@material-ui/icons";

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
  const { products, mode, onAddItem, onRemoveItem } = props;

  const addItem = (item) => {
    onAddItem({ mode: mode, item: item });
  };
  const removeItem = (item) => {
    onRemoveItem({ mode: mode, item: item });
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
                  {mode === "basket" && (
                    <div component="form" className={classes.manageProduct}>
                      <IconButton
                        aria-label="add"
                        className={classes.iconBtn}
                        onClick={() => addItem(item)}
                      >
                        <AddCircle fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="remove"
                        className={classes.iconBtn}
                        onClick={() => removeItem(item)}
                      >
                        <RemoveCircle fontSize="small" />
                      </IconButton>
                      <Box pl={1}>{`Qty: ${item.count}`}</Box>
                    </div>
                  )}
                  <div className={classes.priceText}>
                    {mode === "list"
                      ? `Price/Kg: ${item.fields["Price / Kg"]} JOD`
                      : `Amount: ${item.fields["Price / Kg"] * item.count} JOD`}
                  </div>
                  {mode === "list" && (
                    <div component="form" className={classes.manageProduct}>
                      <IconButton
                        aria-label="add"
                        className={classes.iconBtn}
                        onClick={() => addItem(item)}
                      >
                        <AddCircle fontSize="large" />
                      </IconButton>
                      <IconButton
                        aria-label="remove"
                        className={classes.iconBtn}
                        onClick={() => removeItem(item)}
                      >
                        <RemoveCircle fontSize="large" />
                      </IconButton>
                    </div>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </>
      ))}
      {mode === "basket" && <Box>{`Total: 100 JOD`}</Box>}
    </List>
  );
}
