pragma solidity >=0.4.25 <0.6.0;

import "./UserContract.sol";
import "./Product.sol";

contract SupplierContract is UserContract {
    string public company;

    constructor () public payable{

    }

    function setSuppArguments (uint _id,string memory _activity) public {
        company = _activity;
        setUserArguments (_id);
    }
}