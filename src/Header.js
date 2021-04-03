import React from "react";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import homeStyles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

export default function Header(props) {
  const { playlistData } = props;
  return (
    <Box display="flex" justifyContent="center" flexDirection="column" mb={2}>
      <Box display="flex" justifyContent="center">
        <Link href="/">
          <a>
            <img
              src="/images/logo.jpg"
              alt="Tafsir Institute Logo"
              className={homeStyles.logo}
            />
          </a>
        </Link>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        className={utilStyles.headingXl}
      >
        {playlistData.description}
      </Box>
    </Box>
  );
}
