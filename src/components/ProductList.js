import React from "react";
import { connect } from "react-redux";
import { get } from "../store/data.store";
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
import { AddCircle, RemoveCircle, Storefront } from "@material-ui/icons";
import theme from "../theme";

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

function ProductList(props) {
  const classes = useStyles();
  const { products, mode } = props;

  const addItem = (item) => {
    props.add(item);
  };

  const removeItem = (item) => {
    props.remove(item);
  };

  return (
    <List>
      {products.map((item, i) => (
        <div key={i}>
          <ListItem className={classes.listitem}>
            <ListItemAvatar>
              <>
                {"image" in item.fields && item.fields.image.length > 0 ? (
                  <Avatar
                    variant="square"
                    className={classes.avatar}
                    src={item.fields.image[0].url}
                  />
                ) : (
                  <Avatar variant="square">
                    <Storefront />
                  </Avatar>
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
                      <AddCircle fontSize="large" color="secondary"/>
                    </IconButton>
                    <IconButton
                      aria-label="remove"
                      className={classes.iconBtn}
                      onClick={() => removeItem(item)}
                    >
                      <RemoveCircle fontSize="large" color="secondary"/>
                    </IconButton>
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
  cartItems: state.cart,
});

const mapDispatchToProps = {
  get,
  remove,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
