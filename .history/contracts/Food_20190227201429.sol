pragma solidity >=0.4.0 <0.6.0;


contract Food {

    struct Product {
        uint productId;
        bytes32 pType;
        bytes32 name;
        uint  harDate;
        uint  shipFarmerDate;
        uint  shipSupplierDate;
        uint quantity;
        address addrOwner;
        bytes32 owner;
    }
    // Store food
    mapping(address => bool) public owners;

    // Fetch product
    mapping(uint => Product) public products;

    uint public productsCount;

    function addProduct(bytes32 _pType,bytes32 _name,uint _harDate,address _addrOwner ) public {
        productsCount ++;
        products[productsCount] = Product(productsCount,_pType,_name,_harDate,0,0,0,_addrOwner,bytes32 ("Farmer"));
    }

    function ship (uint _productId, uint _shipDate, address _addrReceiver, bytes32 receiver) public {

        // require a valid candidate
        require(_productId > 0 && _productId <= productsCount);
        // record that voter has voted
        //voters[msg.sender] = true;
        bytes32   tempEmptyStringTest = bytes32 (receiver);
        bytes32   tempEmptyStringSupp = bytes32 ("Supplier");
        bytes32   tempEmptyStringMark = bytes32 ("Market");


        // update owner date owner addr
        if (tempEmptyStringTest == tempEmptyStringSupp) {
            products[_productId].addrOwner = _addrReceiver;
            products[_productId].owner = receiver;
            products[_productId].shipFarmerDate = _shipDate;
        }

        if (tempEmptyStringTest == tempEmptyStringMark) {
            products[_productId].addrOwner = _addrReceiver;
            products[_productId].owner = receiver;
            products[_productId].shipSupplierDate = _shipDate;
        }


        // trigger voted event
        emit shipEvent(_productId);
    }

    event shipEvent (
        uint indexed _productId
    );
}
