pragma solidity ^0.5.0;
import "./Point.sol";

contract Market {
    struct Item {
        string name;
        uint256 price;
        address owner;
        string imageUrl;
        uint256 itemType;
        bool isSelling;
    }

    /**
     * timeStart: Timeline to calculate the next interest amount
     * currentFund: Current fund without taking next interest (convert to ONE)
     */

    struct Balance {
        uint256 timeStart;
        uint256 currentFund;
    }

    Point public pointContract;
    address payable public managerAddress;
    uint256 public buyBackRate;
    uint256 public interestRate;

    uint256[] public sellingItems;
    Item[] public items;
    mapping(address => uint256[]) public buyerItems;
    mapping(address => Balance) public userBalance;

    //EVENT

    /** emitted when a new item is sell in Market
     */
    event Sell(uint256 id, uint256 price, address owner);
    event Buy(uint256 id, uint256 price);
    event WithdrawStake(uint256 amount);

    modifier onlyManager() {
        require(msg.sender == managerAddress, "Must be manager");
        _;
    }

    //MODIFIER
    modifier itemInList(uint256 _id) {
        require(_id < items.length, "Item must be exist");
        _;
    }

    modifier itemOnSale(uint256 _id) {
        require(items[_id].isSelling, "Item must be on sale");
        _;
    }

    modifier pointContractMustExist() {
        require(
            address(pointContract) != address(0),
            "Point contract must exist!"
        );
        _;
    }

    //FUNCTION
    constructor() public {
        managerAddress = msg.sender;
    }

    function setPointContract(address _pointContractAddress)
        public
        onlyManager
    {
        require(
            _pointContractAddress != address(0),
            "Point contract address must not be null address!"
        );

        pointContract = Point(_pointContractAddress);
    }

    function setBuyBackRate(uint256 _buyBackRate) public onlyManager {
        buyBackRate = _buyBackRate;
    }

    function setInterestRate(uint256 _interestRate) public onlyManager {
        interestRate = _interestRate;
    }

    function getAllItems()
        public
        view
        returns (uint256[] memory, bool[] memory)
    {
        uint256[] memory price = new uint256[](items.length);
        bool[] memory isSelling = new bool[](items.length);

        for (uint256 i = 0; i < items.length; i++) {
            Item storage item = items[i];
            price[i] = item.price;
            isSelling[i] = item.isSelling;
        }

        return (price, isSelling);
    }

    function getSellingItems() public view returns (uint256[] memory) {
        return sellingItems;
    }

    function getItemById(uint256 _id)
        public
        view
        itemInList(_id)
        returns (
            uint256,
            address,
            string memory,
            uint256,
            string memory
        )
    {
        Item storage item = items[_id];
        return (
            item.price,
            item.owner,
            item.imageUrl,
            item.itemType,
            item.name
        );
    }

    function itemsOf(address _owner) public view returns (uint256[] memory) {
        return buyerItems[_owner];
    }

    function getMarketBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function sell(
        string memory _name,
        uint256 _price,
        address _owner,
        string memory _imageUrl,
        uint256 _itemType
    ) public {
        require(0 <= _itemType && _itemType <= 4, "Item type must in 0 -> 4");

        items.push(Item(_name, _price, _owner, _imageUrl, _itemType, true));
        sellingItems.push(items.length - 1);
        emit Sell(items.length - 1, _price, _owner);
    }

    function buy(uint256 _id)
        public
        payable
        itemInList(_id)
        itemOnSale(_id)
        pointContractMustExist
    {
        Item storage item = items[_id];
        require(msg.value >= item.price, "Must have enough money");
        item.isSelling = false;
        buyerItems[msg.sender].push(_id);
        removeFromSellingItem(_id);

        // update currentFund before adding point
        Balance storage balance = userBalance[msg.sender];
        uint256 currentPoint = pointContract.balanceOf(msg.sender);
        balance.currentFund +=
            (((block.timestamp - balance.timeStart) / (1 days)) *
                interestRate *
                currentPoint) /
            100;
        balance.timeStart = block.timestamp;

        // calculate and back point
        uint256 pointAmount = (buyBackRate * item.price) / 1000;
        pointContract.mint(msg.sender, pointAmount);

        emit Buy(_id, item.price);
    }

    function getWithdrawableStake(address account)
        public
        view
        returns (uint256)
    {
        Balance storage balance = userBalance[account];
        uint256 currentPoint = pointContract.balanceOf(account);

        uint256 withdrawableStake = balance.currentFund +
            (((block.timestamp - balance.timeStart) / (1 days)) *
                interestRate *
                currentPoint) /
            100;
        return withdrawableStake;
    }

    function withdrawStake(uint256 amount)
        public
        payable
        pointContractMustExist
    {
        uint256 marketBalance = address(this).balance;
        require(
            marketBalance >= amount,
            "Market balance have not enough to withdraw!"
        );

        Balance storage balance = userBalance[msg.sender];
        uint256 currentPoint = pointContract.balanceOf(msg.sender);

        uint256 withdrawableStake = balance.currentFund +
            (((block.timestamp - balance.timeStart) / (1 days)) *
                interestRate *
                currentPoint) /
            100;

        require(
            withdrawableStake >= amount,
            "Withdraw must be less or equal amount of money in stake!"
        );

        balance.currentFund = withdrawableStake - amount;
        balance.timeStart = block.timestamp;

        pointContract.burnSun(
            msg.sender,
            (currentPoint * amount) / withdrawableStake
        );

        msg.sender.transfer(amount);
        emit WithdrawStake(amount);
    }

    /** Remove item in sellingItems when it was bought
     */
    function removeFromSellingItem(uint256 _id) internal {
        for (uint256 i; i < sellingItems.length; i++) {
            if (sellingItems[i] == _id) {
                sellingItems[i] = sellingItems[sellingItems.length - 1];
                sellingItems.pop();
                break;
            }
        }
    }

    function withdraw() public onlyManager {
        managerAddress.transfer(address(this).balance);
    }
}
