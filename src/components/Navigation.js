import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ProductList from "../components/ProductList";
import Toolbar from "@material-ui/core/Toolbar";
import utilStyles from "../../styles/utils.module.css";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Logo from "./Logo";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";
import Link from "next/link";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    marginLeft: 0,
    paddingLeft: 0,
    backgroundImage: `url("/images/organic-market-banner.jpg")`,
  },
  menuButton: {
    padding: 0,
    margin: 0,
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navAvatar: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  treeRoot: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.primary.main})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
    fontFamily: "Amiri",
    direction: "rtl",
  },
  appBarTitle: {
    fontSize: "1.4rem",
    lineHeight: 1.1,
    color: theme.palette.text.primary,
    flexGrow: 1,
  },
}));

function Navigation(props) {
  const { window, basketList, title } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const addItemToBasket = (item) => {
    console.log(item);
  };

  React.useEffect(() => {
    // Update the document title using the browser API
  });

  const drawer = (
    <Box p={1}>
      <Box display="flex" flexDirection="row">
        <ShoppingBasketIcon />
        <Box pl={1}>
          <div className={utilStyles.headingLg}>Order Basket</div>
        </Box>
      </Box>
      <Divider />
      <ProductList
        products={basketList}
        mode="basket"
        onAddItem={addItemToBasket}
      />
    </Box>
  );

  //Add basket component and list of products

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <ShoppingBasketIcon />
          </IconButton>
          <div className={classes.appBarTitle}>{title}</div>
          <Link href="/">
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  window: PropTypes.func,
};

export default Navigation;
