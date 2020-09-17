pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

/**
 * @title Point
 **/

contract Point is ERC20Mintable, ERC20Detailed, ERC20Pausable {
    constructor(string memory _symbol)
        public
        ERC20Detailed(_symbol, _symbol, 18)
    {
        // Intentionally left blank
    }

    function burnSun(address _account, uint256 _amount)
        public
        onlyMinter
        returns (bool)
    {
        _burn(_account, _amount);
        return true;
    }
}
