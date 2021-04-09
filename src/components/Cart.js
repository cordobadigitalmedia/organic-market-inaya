import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { add, remove } from "../store/cart.store";
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

function Cart(props) {
  const classes = useStyles();
  console.log(props.cartItems.items);
  return (
    <List>
      {props.cartItems.items.map((item, i) => (
        <div key={i}>
          <ListItem className={classes.listitem}>
            <ListItemAvatar>
              <>
                {"image" in item.product.fields && item.product.fields.image.length > 0 ? (
                  <Avatar
                    variant="square"
                    className={classes.avatar}
                    src={item.product.fields.image[0].url}
                  />
                ) : (
                  <Avatar variant="square">{`${i + 1}`}</Avatar>
                )}
              </>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <div className={classes.listTitle}>{item.product.fields.Name}</div>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <div component="form" className={classes.manageProduct}>
                    <IconButton
                      aria-label="add"
                      className={classes.iconBtn}
                      onClick={() => props.add(item.product)}
                    >
                      <AddCircle fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="remove"
                      className={classes.iconBtn}
                      onClick={() => props.remove(item.product)}
                    >
                      <RemoveCircle fontSize="small" />
                    </IconButton>
                    <Box pl={1}>{`Qty: ${item.count}`}</Box>
                  </div>
                  <div className={classes.priceText}>
                    {`Amount: ${item.product.fields["Price / Kg"] * item.count} JOD`}
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </div>
      ))}
      <Box>{`Total: 100 JOD`}</Box>
    </List>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
  cartItems: state.cart,
});

const mapDispatchToProps = {
  remove,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
