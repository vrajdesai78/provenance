// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Provenance {
    struct Product {
        uint256 productId;
        string name;
        string description;
        string imageURL;
        string[] locationStatuses;
        uint256[] timestamp;
        string[] locationURL;
    }

    // Enum to store different user roles
    enum Role {
        Default,
        Manufacturer,
        Distributor,
        Retailer
    }

    // Struct to store information about users
    struct User {
        string name;
        string email;
        Role role;
    }

    // Mapping to store the address of the user to the user struct
    mapping(address => User) public users;

    // Add a new user to the mapping
    function addUser(
        string memory _name,
        string memory _email,
        Role _role
    ) public {
        users[msg.sender] = User(_name, _email, _role);
    }

    mapping(uint256 => Product) public products;

    // Array to store product Ids
    uint256[] public productIds;

    uint256 public productCount = 0;

    function addProduct(
        uint256 _id,
        string memory _name,
        string memory _description,
        string memory _location,
        string memory _imageURL,
        string memory _locationURL
    ) public {
        require(
            users[msg.sender].role == Role.Manufacturer,
            "Only manufacturer can add products"
        );
        productCount++;
        products[_id] = Product(
            _id,
            _name,
            _description,
            _imageURL,
            new string[](0),
            new uint256[](0),
            new string[](0)
        );
        products[_id].locationStatuses.push(_location);
        products[_id].timestamp.push(block.timestamp);
        products[_id].locationURL.push(_locationURL);
        productIds.push(_id);
    }

    function addLocationStatus(
        uint256 _id,
        string memory _locationStatus,
        string memory _locationURL
    ) public {
        require(users[msg.sender].role != Role.Default, "User is not registered");
        Product storage _product = products[_id];
        _product.locationStatuses.push(_locationStatus);
        _product.locationURL.push(_locationURL);
    }

    function getProduct(uint256 _id) public view returns (Product memory) {
        return (products[_id]);
    }

    function getProductCount() public view returns (uint256) {
        return productCount;
    }

    // Get all products
    function getAllProducts() public view returns (Product[] memory) {
        Product[] memory _products = new Product[](productIds.length);
        // For each product id, get the product and add it to the array
        for (uint256 i = 0; i < productIds.length; i++) {
            _products[i] = products[productIds[i]];
        }
        return _products;
    }
}
