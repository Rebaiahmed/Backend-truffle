pragma solidity >=0.4.25 <0.6.0;

import "./UserContract.sol";
import "./Product.sol";

contract FarmerContract is UserContract {
    bytes32 activity;

    constructor () public {

    }

    function setFarmerArguments (uint _id,bytes32 _fName,bytes32 _lName,bytes32 _email,bytes32 _phone,bytes32 _addr,bytes32 _activity) public {
        activity = _activity;
        setUserArguments (_id,_fName,_lName,_email,_phone,_addr);
    }

    function addProduct(bytes32 _pType,bytes32 _name,uint _harDate,uint _quantity ) public {
        Product p = new Product ();
        p.setProductArguemtns(_pType,_name, _harDate,_quantity);
        products [address(p)] = p;
    }

}
