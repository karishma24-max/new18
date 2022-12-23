import {Box,Image} from "@chakra-ui/react"
import styles from "../styles/Home.module.css"

import Navbar from "./Navbar"
export default function Home() {
  return (
    <>
      <div className={styles.kiya}>
        <Box>
        <Navbar/>

        </Box>
      </div>
    </>
  )
}
