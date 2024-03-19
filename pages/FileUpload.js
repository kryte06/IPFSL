/** @format */

import React, { useState } from "react";
import { useEffect } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import Link from "next/link";
import {
  Button,
  Header,
  Icon,
  Segment,
  Message,
  Menu,
  MenuItem,
  MenuMenu,
  ButtonContent,
} from "semantic-ui-react";
import ipfsl from "./ipfsl";

function FileUpload() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [accounts, setAccounts] = useState([]); // State to hold Ethereum accounts

  useEffect(() => {
    // Fetch Ethereum accounts
    async function fetchAccounts() {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Get Ethereum accounts
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setAccounts(accounts);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      }
    }

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: `8a31162c870aff19c285`,
          pinata_secret_api_key: `64135af347d8d9532dc146bb57baea8c97c0f3f0c7a3392b1e39cc48637d9392`,
          "Content-Type": "multipart/form-data",
        },
      });
      const Url = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
      await ipfsl.methods.add(accounts[0], Url).send({ from: accounts[0] });
      alert("Successfully Image Uploaded");
      console.log(Url);
      setFileUrl(Url);
      setFile("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div> {accounts[0]} </div>{" "}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/">
          <Button animated secondary>
            <ButtonContent visible> Home </ButtonContent>{" "}
            <ButtonContent hidden>
              <Icon name="home" />
            </ButtonContent>{" "}
          </Button>{" "}
        </Link>{" "}
      </div>{" "}
      <div style={{ margin: "98px", marginTop: "5px", marginBottom: "10px" }}>
        <Message icon="file  outline" header="Please Select File">
          {" "}
        </Message>{" "}
        <Segment placeholder>
          <Header icon>
            <Icon name="file outline" /> {file ? "" : "NO FILE SELECTED"}{" "}
          </Header>{" "}
          <form onSubmit={handleSubmit}>
            <Button secondary>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />{" "}
            </Button>{" "}
            <br> </br> <Button secondary> submit </Button>{" "}
          </form>{" "}
        </Segment>{" "}
        <Menu>
          <MenuItem>
            <Link href="/Component1">
              <Button animated secondary>
                <ButtonContent visible> Back </ButtonContent>{" "}
                <ButtonContent hidden>
                  <Icon name="left arrow" />
                </ButtonContent>{" "}
              </Button>{" "}
            </Link>{" "}
          </MenuItem>{" "}
          <MenuMenu position="right">
            <MenuItem>
              <Link href="/Display">
                <Button animated secondary>
                  <ButtonContent visible> View Uploaded File </ButtonContent>{" "}
                  <ButtonContent hidden>
                    <Icon name="right arrow" />
                  </ButtonContent>{" "}
                </Button>{" "}
              </Link>{" "}
            </MenuItem>{" "}
          </MenuMenu>{" "}
        </Menu>{" "}
      </div>{" "}
    </Layout>
  );
}
export default FileUpload;
