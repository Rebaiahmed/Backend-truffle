pragma solidity >=0.4.25 <0.6.0;

import "./UserContract.sol";
import "./Product.sol";

contract FarmerContract is UserContract {
    string public activity;

    constructor () public {

    }

    function setFarmerArguments (uint _id,string memory _activity) public {
        activity = _activity;
        setUserArguments (_id);
    }
}