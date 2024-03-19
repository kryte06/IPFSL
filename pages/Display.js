/** @format */

import React, { useState } from "react";
import Layout from "../Components/Layout";
import { useEffect } from "react";
import web3 from "./web3";
import ipfsl from "./ipfsl";
import Link from "next/link";
import {
  TableRow,
  TableCell,
  TableBody,
  Icon,
  Table,
  Modal,
  Button,
  ButtonContent,
  Segment,
} from "semantic-ui-react";

function Display() {
  const [accounts, setAccounts] = useState([]);
  const [uaddress, setUaddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Track selected address
  const [files, setFiles] = useState([]); // State to store files associated with the selected address
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

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
      const addresses = await ipfsl.methods
        .getUploadedAddresses()
        .call({ from: accounts[0] });
      setUaddress(addresses);
    }
    fetchData();
  }, []);

  const handleViewFiles = async (address) => {
    // Set selected address
    setSelectedAddress(address);
    // Call the display function to get files associated with the address
    try {
      const files = await ipfsl.methods
        .display(address)
        .call({ from: accounts[0] });
      setFiles(files);
      // Open the modal
      setOpenModal(true);
    } catch (error) {
      // Handle unauthorized access
      alert(
        "You are not authorized to access files associated with this address."
      );
    }
  };

  const handleCloseModal = () => {
    // Close the modal
    setOpenModal(false);
    // Clear files state
    setFiles([]);
  };

  return (
    <Layout>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
        }}
      >
        <Segment inverted>
          <Link href="/">
            <Button animated inverted color="purple">
              <ButtonContent visible>Back</ButtonContent>
              <ButtonContent hidden>
                <Icon name="arrow left" />
              </ButtonContent>
            </Button>
          </Link>
        </Segment>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Table celled striped>
          <h4>Uploaded Addresses</h4>
          <TableBody>
            {uaddress.map((address, index) => (
              <TableRow key={index}>
                <TableCell collapsing>
                  <Icon name="address card" /> ADDRESS {index + 1}:
                </TableCell>
                <TableCell>{address}</TableCell>
                <TableCell collapsing textAlign="right">
                  <button onClick={() => handleViewFiles(address)}>
                    VIEW FILES
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Modal.Header>Files Associated with {selectedAddress}</Modal.Header>
        <Modal.Content>
          {files.length > 0 ? (
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    {file}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Not authorized.</p>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Actions>
      </Modal>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Link href="/FileUpload">
          <Segment inverted>
            <Button animated inverted color="purple">
              <ButtonContent visible>Upload</ButtonContent>
              <ButtonContent hidden>
                <Icon name="upload" />
              </ButtonContent>
            </Button>
          </Segment>
        </Link>
      </div>
    </Layout>
  );
}

export default Display;
