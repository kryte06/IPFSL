/** @format */

import React from "react";
import { useRouter } from "next/router";
import Layout from "../Components/Layout";
import {
  GridRow,
  GridColumn,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  ButtonContent,
} from "semantic-ui-react";
import Link from "next/link";

function Component1() {
  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header as="h3" block>
          Select Action
        </Header>
      </div>
      <div
        style={{
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <GridRow verticalAlign="middle">
              <GridColumn>
                <Header icon>
                  <Icon name="upload" />
                  Upload Image
                </Header>
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
              </GridColumn>

              <GridColumn>
                <Header icon>
                  <Icon name="sticky note" />
                  View Files
                </Header>
                <Link href="/Display">
                  <Segment inverted>
                    <Button animated inverted color="purple">
                      <ButtonContent visible>View Files</ButtonContent>
                      <ButtonContent hidden>
                        <Icon name="file" />
                      </ButtonContent>
                    </Button>
                  </Segment>
                </Link>
              </GridColumn>
            </GridRow>
          </Grid>
        </Segment>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Segment inverted>
          <Link href="/Share_A">
            <Button animated inverted color="purple">
              <ButtonContent visible>Share Content</ButtonContent>
              <ButtonContent hidden>
                <Icon name="share" />
              </ButtonContent>
            </Button>
          </Link>
        </Segment>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "12px",
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
    </Layout>
  );
}

export default Component1;
