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
  Tooltip,
} from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { AddCircle, RemoveCircle, Storefront } from "@material-ui/icons";
import dataParser from "../utils/dataParser";
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
        <Box key={i * 1000}>
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
            <Box>
              <Box className={classes.listTitle}>{item.fields.Name}</Box>
              <React.Fragment>
                <Box className={classes.priceText}>
                  {`Price/Kg: ${item.fields["Price / Kg"].toFixed(2)} JOD`}
                </Box>
                {dataParser.disableProduct(item) ? (
                  <Box component="form" className={classes.manageProduct}>
                    <Tooltip
                      title={`Item cannot be added as it needs ${item.fields["Delivery Notice"]} days for preparation`}
                    >
                      <Alert severity="error">Not Available</Alert>
                    </Tooltip>
                  </Box>
                ) : (
                  <Box component="form" className={classes.manageProduct}>
                    <Tooltip title="Add to basket">
                      <IconButton
                        aria-label="add"
                        className={classes.iconBtn}
                        onClick={() => addItem(item)}
                      >
                        <AddCircle fontSize="large" color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove from basket">
                      <IconButton
                        aria-label="remove"
                        className={classes.iconBtn}
                        onClick={() => removeItem(item)}
                      >
                        <RemoveCircle fontSize="large" color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </React.Fragment>
            </Box>
          </ListItem>
          <Divider />
        </Box>
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
