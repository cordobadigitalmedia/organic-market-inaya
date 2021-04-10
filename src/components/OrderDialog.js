import React, { useState } from "react";
import { connect } from "react-redux";
import { add, remove } from "../store/cart.store";
import { withStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
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
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { MonetizationOn } from "@material-ui/icons";
import _ from "lodash";

const styles = (theme) => ({});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
});

function OrderDialog(props) {
  const [showDialog, setshowDialog] = useState(false);

  const handleClick = () => {
    setshowDialog(!showDialog);
  };

  const handleCloseDialog = () => {
    setshowDialog(false);
  };

  const findPickupDate = () => {
    const dayINeed = 6; // for Thursday
    const today = DateTime.now().weekday;

    if (today < dayINeed) {
      return DateTime.now()
        .plus({ days: dayINeed - today })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    } else if (today === dayINeed) {
      return DateTime.now().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    } else {
      return DateTime.now()
        .plus({ days: 7 - (today - dayINeed) })
        .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    }
  };

  return (
    <Box>
      <Box display="flex" flexDirection="row">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          disabled={props.cartItems.totalAmount === 0}
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
          <Box pb={1}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="person">
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
                    <TextField id="name" label="Name" variant="outlined" />
                  </Box>
                  <Box>
                    <TextField id="email" label="E-mail" variant="outlined" />
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
                    {`Pickup on ${findPickupDate()}`}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1" component="p">
                  Please pickup and pay for your items below at Inaya
                  Permaculture's home organic farmers market on{" "}
                  <b>{findPickupDate()}</b> from 11:00 AM to 7:00 PM
                </Typography>
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
                                {`Amount: ${
                                  item.product.fields["Price / Kg"] * item.count
                                } JOD`}
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
                          {`Total: ${props.cartItems.totalAmount} JOD`}
                        </Typography>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick()}
          >
            Submit Order Now
          </Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDialog);
