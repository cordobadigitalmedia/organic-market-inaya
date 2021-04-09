import React from "react";
import { add, remove } from "../store/cart.store";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Badge, Button, ButtonGroup } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  dropdownItem: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  btn: {
    padding: "0",
  },
  btnGroup: {
    marginLeft: "25px",
  },
  root: {
    width: "100%",
    maxWidth: 500,
  },
});
function Cart(props) {
  const classes = useStyles();
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="Primary" id="dropdown-basic">
          <Badge badgeContent={props.cartItems.totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {console.log("inside cart component======>", props.cartItems.items)}
          {props.cartItems.items.map((item, idx) => {
            return (
              <Dropdown.ItemText className={classes.dropdownItem}>
                <Badge badgeContent={item.count} color="primary">
                  {item.product.display_name}
                </Badge>
                <ButtonGroup className={classes.btnGroup}>
                  <Button
                    className={classes.btn}
                    aria-label="reduce"
                    onClick={async () => {
                      props.remove(item.product);
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    className={classes.btn}
                    aria-label="increase"
                    onClick={async () => {
                      props.add(item.product);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Dropdown.ItemText>
            );
          })}
          {/* <Dropdown.Item
            onClick={() => {
              props.reset();
            }}
          >
            Reset <RotateLeftIcon />
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
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
