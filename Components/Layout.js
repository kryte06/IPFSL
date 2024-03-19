/** @format */

import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Navbar from "../pages/Navbar";
import styles from "../pages/styles/index.module.css";
import web3 from "../pages/web3";

function Layout(props) {
  const [accounts, setAccounts] = useState("");
  useEffect(() => {
    async function fetchData() {
      const accounts = await web3.eth.getAccounts();
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccounts(accounts);
    }
    fetchData();
  }, []);
  return (
    <div className={styles.CSS}>
      <Container>
        <Head>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
          />
        </Head>

        <Navbar accounts={accounts} />
        {props.children}
      </Container>
    </div>
  );
}
export default Layout;
