pragma solidity >=0.4.17 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {

  }

  function Migrations() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }


}
