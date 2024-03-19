// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract IPFSL {
    struct Access {
        address user;
        bool access; //true or false
    }
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;
    address[] uploadedAddresses; // New mapping to store all uploaded addresses

    function add(address _user, string memory url) external {
        value[_user].push(url);
        if (!previousData[_user][msg.sender]) {
            uploadedAddresses.push(_user); // Update uploadedAddresses when a new address uploads
            previousData[_user][msg.sender] = true;
        }
    }

    function allow(address user) external {
        //def
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    // Function to get all uploaded addresses
    function getUploadedAddresses() public view returns (address[] memory) {
        return uploadedAddresses;
    }
}
