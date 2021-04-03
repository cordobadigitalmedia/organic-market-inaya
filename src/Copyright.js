import React from "react";
import utilStyles from "../styles/utils.module.css";
import Box from "@material-ui/core/Box";
import Link from "next/link";

export default function Copyright() {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center" mb={1}>
      <Box px={2} justifyContent="center">
        <Link href="https://vercel.com/">
          <a target="_blank" rel="noreferrer" className={utilStyles.aLink}>
            Site hosted on Vercel
          </a>
        </Link>
      </Box>
      <Box px={2} justifyContent="center">
        <div className={utilStyles.navText} align="center">
          {"حقوق النشر © "}
          <Link href="https://tafsir.institute/">
            <a rel="noreferrer" className={utilStyles.aLink}>
              معهد تفسير
            </a>
          </Link>{" "}
          {new Date().getFullYear()}.
        </div>
      </Box>
      <Box px={2} justifyContent="center">
        <Link href="https://www.youtube.com/channel/UCCJ6xD0brwMP8hAq2TTDOSA">
          <a target="_blank" rel="noreferrer" className={utilStyles.aLink}>
            Videos hosted on Youtube
          </a>
        </Link>
      </Box>
    </Box>
  );
}
