pragma solidity >=0.4.17 <0.6.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;



  function Migrations() public {
    owner = msg.sender;
  }




}
