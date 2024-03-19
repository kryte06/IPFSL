/** @format */
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import web3 from "./web3";
import ipfsl from "./ipfsl";
import {
  Button,
  Form,
  Message,
  Segment,
  ButtonContent,
  Icon,
} from "semantic-ui-react";
import Link from "next/link";

function Share_A() {
  const [accounts, setAccounts] = useState([]);
  const [sharedAddress, setSharedAddress] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }
    fetchAccounts();
  }, []);

  const handleShareAccess = async () => {
    try {
      // Call the allow function from the smart contract to grant access
      await ipfsl.methods.allow(sharedAddress).send({ from: accounts[0] });
      setSuccessMessage("Access granted successfully.");
    } catch (error) {
      console.error("Error sharing access:", error);
      setError("Failed to share access.");
    }
  };

  return (
    <Layout>
      <h2>Share Access</h2>
      <Form onSubmit={handleShareAccess} error={error !== null}>
        <Form.Field>
          <label>Provide Address to share access with:</label>
          <input
            type="text"
            value={sharedAddress}
            onChange={(e) => setSharedAddress(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">Share Access</Button>
        {error && <Message error content={error} />}
        {successMessage && <Message success content={successMessage} />}
      </Form>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
        }}
      >
        <Segment inverted>
          <Link href="/Component1">
            <Button animated inverted color="purple">
              <ButtonContent visible>Back</ButtonContent>
              <ButtonContent hidden>
                <Icon name="arrow left" />
              </ButtonContent>
            </Button>
          </Link>
        </Segment>
      </div>
    </Layout>
  );
}

export default Share_A;
