import React, { useState } from "react";
import { connect } from "react-redux";
import { add, remove, reset } from "../store/cart.store";
import { changeUser, saveRecentOrders, resetRecent } from "../store/data.store";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  CardHeader,
  CardContent,
  Card,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Divider,
  Snackbar,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { MonetizationOn } from "@material-ui/icons";
import _ from "lodash";
import ordersService from "../../src/services/ordersService";
import dataParser from "../utils/dataParser";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary,
  },
}));

const DialogTitle = (props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1} px={1}>
          <Typography variant="h5">{children}</Typography>
        </Box>
        <Box>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </MuiDialogTitle>
  );
};

function OrderDialog(props) {
  const classes = useStyles();
  const [showDialog, setshowDialog] = useState(false);
  const [processing, setprocessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState({ type: "", value: "" });

  const handleClick = () => {
    props.resetRecent();
    setOrderComplete(false);
    setshowDialog(!showDialog);
  };

  const handleCloseDialog = () => {
    setshowDialog(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async () => {
    setMessage({
      type: "",
      value: "",
    });
    var regexEmail = new RegExp(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    if (
      regexEmail.test(props.dataProps.user.email) &&
      props.dataProps.user.name !== "" &&
      props.dataProps.user.phone !== ""
    ) {
      setprocessing(true);
      setMessage({
        type: "info",
        value: "Order submission in process...",
      });
      setOpen(true);
      const orderSubmitResults = await ordersService.addOrder({
        user: props.dataProps.user,
        records: props.cartItems.items,
      });
      if (orderSubmitResults.length > 0) {
        props.saveRecentOrders(orderSubmitResults);
        props.reset();
        setMessage({
          type: "success",
          value: "Successfully submitted your order.",
        });
        setOpen(true);
        setOrderComplete(true);
        setprocessing(false);
        //clear local object order and close window
      } else {
        setMessage({ type: "error", value: "Error submitting order." });
        setOpen(true);
      }
    } else {
      if (props.dataProps.user.name === "") {
        setMessage({ type: "error", value: "Name is required" });
        setOpen(true);
      } else if (props.dataProps.user.phone === "") {
        setMessage({ type: "error", value: "Phone is required." });
        setOpen(true);
      } else {
        setMessage({ type: "error", value: "Email is not valid" });
        setOpen(true);
      }
    }
  };

  const calculateTotal = (items) => {
    let total = 0;
    items.map((item) => {
      total += item.fields.Qty * Number(item.fields["Price"]);
    });
    return total;
  };

  return (
    <Box>
      <Box display="flex" flexDirection="row" pt={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          disabled={props.cartItems.totalAmount === 0}
          fullWidth
        >
          {props.linkText}
        </Button>
      </Box>
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        fullScreen={false}
        scroll="paper"
        aria-labelledby="add-student-dialog"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title" onClose={handleCloseDialog}>
          Place Order
        </DialogTitle>
        <DialogContent dividers={true}>
          <>
            {orderComplete ? (
              <Box>
                <h3>Thank you for your oder.</h3>
                <Typography variant="body1" component="p">
                  Please pickup and pay for your items below at Inaya
                  Permaculture's home organic farmers market on{" "}
                  <b>{dataParser.findPickupDate()}</b> from 11:00 AM to 7:00 PM
                </Typography>
                <List>
                  {props.dataProps.recentOrders.length > 0 &&
                    props.dataProps.recentOrders.map((item, i) => (
                      <div key={item}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>{`${item.fields.Qty}x`}</Avatar>
                          </ListItemAvatar>

                          <ListItemText
                            primary={
                              <React.Fragment>
                                <div>{item.fields["Item Name"].join()}</div>
                              </React.Fragment>
                            }
                            secondary={
                              <React.Fragment>
                                <div>
                                  {`Amount: ${(
                                    item.fields["Price"] * item.fields.Qty
                                  ).toFixed(2)} JOD`}
                                </div>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  <ListItem>
                    <ListItemSecondaryAction>
                      <Box pt={2}>
                        <Typography variant="h6" component="h4">
                          {`Total: ${calculateTotal(
                            props.dataProps.recentOrders
                          ).toFixed(2)} JOD`}
                        </Typography>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            ) : (
              <Box>
                <Box pb={1}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="person" className={classes.avatar}>
                          <PersonAddIcon />
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h4">
                          Personal Information
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Box>
                        <Box pb={1}>
                          <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onChange={(evt) => {
                              props.changeUser({
                                name: evt.target.value,
                                email: props.dataProps.user.email,
                                phone: props.dataProps.user.phone,
                              });
                            }}
                            value={props.dataProps.user.name}
                          />
                        </Box>
                        <Box pb={1}>
                          <TextField
                            id="email"
                            label="E-mail"
                            fullWidth
                            variant="outlined"
                            onChange={(evt) => {
                              props.changeUser({
                                name: props.dataProps.user.name,
                                email: evt.target.value,
                                phone: props.dataProps.user.phone,
                              });
                            }}
                            value={props.dataProps.user.email}
                          />
                        </Box>
                        <Box>
                          <TextField
                            id="phone"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            helperText="A phone number is required so that we can update you with the status of your order via telegram"
                            onChange={(evt) => {
                              props.changeUser({
                                name: props.dataProps.user.name,
                                email: props.dataProps.user.email,
                                phone: evt.target.value,
                              });
                            }}
                            value={props.dataProps.user.phone}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box pb={1}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="address">
                          <PinDropIcon />
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h4">
                          {`Pickup on ${dataParser.findPickupDate()}`}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1" component="p">
                        Please pickup and pay for your items below at Inaya
                        Permaculture's home organic farmers market on{" "}
                        <b>{dataParser.findPickupDate()}</b> from 11:00 AM to
                        7:00 PM
                      </Typography>
                      <Alert severity="warning">{`Please note that orders for the upcoming Saturday will close on ${dataParser.showDeadline()}. The pickup date will change accordingly if you order after ${dataParser.showDeadline()}`}</Alert>
                    </CardContent>
                  </Card>
                </Box>
                <Box pb={1}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="address">
                          <MonetizationOn />
                        </Avatar>
                      }
                      title={
                        <Typography variant="h5" component="h3">
                          Order Summary
                        </Typography>
                      }
                    />
                    <CardContent>
                      <List>
                        {props.cartItems.items.map((item, i) => (
                          <div key={item}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>{`${item.count}x`}</Avatar>
                              </ListItemAvatar>

                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <div>{item.product.fields.Name}</div>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <div>
                                      {`Amount: ${(
                                        item.product.fields["Price"] *
                                        item.count
                                      ).toFixed(2)} JOD`}
                                    </div>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider />
                          </div>
                        ))}
                        <ListItem>
                          <ListItemSecondaryAction>
                            <Box pt={2}>
                              <Typography variant="h6" component="h4">
                                {`Total: ${props.cartItems.totalAmount.toFixed(
                                  2
                                )} JOD`}
                              </Typography>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
          </>
        </DialogContent>
        <DialogActions>
          <Box>
            {orderComplete ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseDialog}
              >
                Close
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={processing}
                onClick={() => handleSubmit()}
              >
                Submit Order Now
              </Button>
            )}

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={Message.type}>
                {Message.value}
              </Alert>
            </Snackbar>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  dataProps: state.data,
  cartItems: state.cart,
});

const mapDispatchToProps = {
  remove,
  add,
  reset,
  changeUser,
  saveRecentOrders,
  resetRecent,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDialog);
