pragma solidity >=0.4.25 <0.6.0;

import "./UserContract.sol";
import "./Product.sol";

contract RetailerContract is UserContract {
    string public companyRetailer;

    constructor () public payable{

    }

    function setRetaiArguments (uint _id,string memory _activity) public {
        companyRetailer = _activity;
        setUserArguments (_id);
    }
}