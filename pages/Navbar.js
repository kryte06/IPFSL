/** @format */
import Link from "next/link";
import React from "react";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react";

function Navbar(props) {
  const { accounts } = props;
  const connectedAccount = accounts && accounts.length > 0 ? accounts[0] : "";
  return (
    <Menu>
      <MenuItem>IPFS Storage</MenuItem>
      <MenuItem>
        <Link href="/">Home</Link>
      </MenuItem>
      <MenuMenu position="right">
        <MenuItem name="accounts">
          Wallet Connected to : {connectedAccount}
        </MenuItem>
      </MenuMenu>
    </Menu>
  );
}
export default Navbar;
