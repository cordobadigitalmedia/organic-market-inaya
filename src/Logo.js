import React from "react";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  logo: {
    width: drawerWidth,
  },
}));

export default function Logo(props) {
  const classes = useStyles();
  return (
    <Link href="/">
      <a>
        <img
          src="/images/logo.png"
          alt="Inaya Logo"
          className={classes.logo}
        />
      </a>
    </Link>
  );
}
