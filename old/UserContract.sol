pragma solidity >=0.4.25 <0.6.0;

import "./Product.sol";

contract UserContract {

    uint public id;
    

    mapping (uint=>Product) public products ;

    constructor () public payable {

    }

    function setUserArguments (uint _id) public {
        id = _id;
    }

    function getProduct (uint _a) public returns (Product) {
        return products[_a];
    }

    function setProduct (uint _a,Product _p) public {
        // p.setProductArguemtns(_p.getIdProduct(),_p.getType(),_p.getName(),_p.getHarDate(),_p.getAddr(),_p.getQuantity(),_p.getAddrOwner());
        // p.setShipped(_p.getShipped());
        // p.setShipDate (_p.getShipDate());
        // p.setAddrPrvOwner(_p.getAddrPrvOwner());
        
        products[_a] = _p;
    }

    function setShipped (uint _a) public {
        products[_a].setShippedProduct();
    }

    function isTokenTransferOK(uint currentOwner, uint newOwner)
        public
        view
        returns (bool ok)
    {
        // Check some arbitrary condition.
        uint tokenAddress = currentOwner;
        return (newOwner) == (tokenAddress);
    }


}
