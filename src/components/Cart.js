import React from "react";
import { connect } from "react-redux";
import { add, remove } from "../store/cart.store";
import {
  ListItemAvatar,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Box,
  Button,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircle, RemoveCircle, MonetizationOn } from "@material-ui/icons";
import OrderDialog from "../components/OrderDialog";

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
  return (
    <List>
      {props.cartItems.items.map((item, i) => (
        <Box key={i * 100}>
          <ListItem className={classes.listitem}>
            <ListItemAvatar>
              <Avatar variant="square">{`x${item.count}`}</Avatar>
            </ListItemAvatar>
            <Box>
              <Box className={classes.listTitle}>
                {item.product.fields.Name}
              </Box>
              <Box component="form" className={classes.manageProduct}>
                <IconButton
                  aria-label="add"
                  className={classes.iconBtn}
                  onClick={() => props.add(item.product)}
                >
                  <AddCircle fontSize="large" color="secondary" />
                </IconButton>
                <IconButton
                  aria-label="remove"
                  className={classes.iconBtn}
                  onClick={() => props.remove(item.product)}
                >
                  <RemoveCircle fontSize="large" color="secondary" />
                </IconButton>
              </Box>
              <Box className={classes.priceText}>
                {`Amount: ${
                  (item.product.fields["Price / Kg"] * item.count).toFixed(2)
                } JOD`}
              </Box>
            </Box>
          </ListItem>
          <Divider />
        </Box>
      ))}
      <ListItem className={classes.listitem}>
        <ListItemIcon>
          <MonetizationOn />
        </ListItemIcon>
        <ListItemText primary={`Total: ${props.cartItems.totalAmount.toFixed(2)} JOD`} />
      </ListItem>
      <OrderDialog linkText="Place Order"/>
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
