import React, { useState } from "react";
import { connect } from "react-redux";
import { add, remove } from "../store/cart.store";
import { withStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
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
            <p>List of items with total price</p>
            <p>Email/Name/Phone Fields</p>
            <p>Submit</p>
            <p>Alert - pickup date/time range location</p>
        </DialogContent>
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
