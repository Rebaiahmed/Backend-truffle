pragma solidity >=0.4.25 <0.6.0;

import "./FarmerContract.sol";
import "./SupplierContract.sol";
import "./RetailerContract.sol";
import "./Product.sol";

contract Food {

    mapping (uint => FarmerContract) public farmers;
    mapping (uint => SupplierContract) public suppliers;
    mapping (uint => RetailerContract) public retailers;
    mapping (uint => Product) public products;

    uint public farmersCount;
    uint public suppliersCount;
    uint public retailersCount;
    uint public productsCount;

    constructor () public {
        
    }
    // add a farmer
    function addFarmer(string memory _activity) public returns (uint){
        farmersCount ++;
        FarmerContract f = new FarmerContract();
        f.setFarmerArguments(farmersCount,_activity);
        farmers[farmersCount] = f; // adding the farmer to our farmers list
        return farmersCount;
    }

    // add a supplier
    function addSupplier (string memory _activity) public returns (uint){
        suppliersCount ++;
        SupplierContract f = new SupplierContract();
        f.setSuppArguments(suppliersCount, _activity);
        suppliers[suppliersCount] = f; // adding the supplier to our suppliers list
        return suppliersCount;
    }

    //add a retailer
    function addRetailer (string memory _activity) public returns (uint){
        retailersCount ++;
        RetailerContract f = new RetailerContract();
        f.setRetaiArguments(retailersCount, _activity);
        retailers[retailersCount] = f; // adding the retailer to our retailers list

        return retailersCount;
    }

    //add a product only by a farmer
    function addProduct(string memory _pType,string memory _name,uint _harDate,string memory _shipAddr,uint _quantity, uint _owner ) public returns (uint){
        //require(_owner > 0 && _owner <= farmersCount);
        productsCount ++;
        Product p = new Product ();
        p.setProductArguemtns (productsCount,_pType,_name, _harDate,_shipAddr,_quantity,_owner);
        products [productsCount] = p;
        farmers[_owner].setProduct(productsCount,products[productsCount]); // adding the new added product to the farmer's products list
        return productsCount;
    }


    function ship (uint _productId,uint _owner, uint _addrReceiver,uint _shipDate, uint _receiver, string memory _addr) public {
        
        // require a valid candidate
        // require(_productId > 0 && _productId <= productsCount);
        // record that voter has voted
        // voters[msg.sender] = true;
        // bytes32   tempEmptyStringTest = bytes32 (_receiver);
        // bytes32   tempEmptyStringSupp = bytes32 ("Supplier");
        // bytes32   tempEmptyStringMark = bytes32 ("Market");
        
        // shipment done by the farmer
        if (_receiver == 0) { // checking if the shipment is done by a farmer
            products[_productId].Transfer(_owner,_addrReceiver); // change the product in the list of all products to its new owner
            farmers[_owner].setShipped(_productId); // set the product in farmer's list of products to being shipped
            products[_productId].setShipDate (_shipDate); // set the date of the shipped product in the list of all products to its new date
            products[_productId].setShipAddress (_addr); // set the addr of the shipped product in the list of all products to its new addr
            suppliers[_addrReceiver].setProduct(_productId,products[_productId]); // adding the transfered product to its new owner's (supplier) list
            // trigger shipment event
            emit shipEvent(_productId);
        }

        // shipment done by the supplier
        if (_receiver == 1) { // checking if the shipment is done by a supplier
            products[_productId].Transfer(_owner,_addrReceiver); // change the product in the list of all products to its new owner
            suppliers[_owner].setShipped(_productId); // set the product in supplier's list of products to being shipped
            products[_productId].setShipDate (_shipDate); // set the date of the shipped product in the list of all products to its new date
            products[_productId].setShipAddress (_addr); // set the addr of the shipped product in the list of all products to its new addr
            retailers[_addrReceiver].setProduct(_productId,products[_productId]); // adding the transfered product to its new owner's (retailer) list
            // trigger shipment event
            emit shipEvent(_productId);
        }


    }

    function getProductHistory (uint _productId ) public returns (uint,uint,uint ) {
        uint idcurrentowner = products[_productId].getAddrOwner();
        Product pR = retailers[idcurrentowner].getProduct(_productId);
        Product pS = suppliers[pR.getAddrPrvOwner()].getProduct(_productId);
        Product pF = farmers[pR.creator()].getProduct(_productId);
        return (pR.getAddrOwner(),pS.getAddrOwner(),pF.getAddrOwner());
    }

    function getProductCurrentState(uint _productId ) public returns (uint,string memory,string memory,uint,uint,string memory,uint,uint,uint,uint,bool){
        Product p = products[_productId];
        return (p.getIdProduct(),p.getType(),p.getName(),p.getHarDate(),p.getShipDate(),p.getAddr(),p.getQuantity(),p.getAddrOwner(),p.getAddrPrvOwner(),p.getCreator(),p.getShipped());
    }

    event shipEvent (
        uint indexed _productId
    );

}