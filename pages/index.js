/** @format */

import React, { Component } from "react";
import Image from "next/image";
import Layout from "../Components/Layout";
import { useState, useEffect } from "react";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Button,
  ButtonContent,
  Icon,
} from "semantic-ui-react";
import Link from "next/link";
import IPFS from "./styles/Image.jpg";
import web3 from "./web3";

function Index() {
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
    <Layout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: "50rem" }}>
          <Image src={IPFS} wrapped ui={false} />
          <CardContent>
            <CardHeader>NOTE!!</CardHeader>
            <CardMeta>IPFS Storage</CardMeta>
            <CardDescription>
              Make sure your browser has Metamask installed before you proceed.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Link href={{ pathname: "/Component1", query: { accounts: accounts } }}>
          <Button animated secondary>
            <ButtonContent visible>Next</ButtonContent>
            <ButtonContent hidden>
              <Icon name="arrow right" />
            </ButtonContent>
          </Button>
        </Link>
      </div>
    </Layout>
  );
}

export default Index;
