// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract FinalFantasy7 is ERC721, Ownable {
	uint256 Total;
	uint256 Fee = 0.02 ether;

	mapping(uint256 => string) private _tokenURIs;

	struct Player{string name; uint256 Level; uint256 Strength; uint256 Magic;  
		uint256 Vitality; uint256 Spirit; uint256 Luck; uint256 Speed;}

		Player[] public players;

	event CreatePlayer(address indexed owner, uint256 Level, uint256 Strength, uint256 Magic,  
		uint256 Vitality, uint256 Spirit, uint256 Luck, uint256 Speed);

	constructor() ERC721('Final Fantasy 7', 'FF7') {
	}
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return super.tokenURI(tokenId);
    }
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        baseTokenURI(tokenId, _tokenURI);
    }
    function baseTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }
	function rNumber(uint256 mod) internal view returns(uint256) {
		uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
		return randomNum % mod;
	}
	function updateFee(uint256 _fee) external onlyOwner() {
		Fee = _fee;
	}
	function withdraw() public payable onlyOwner() {
		address payable owner = payable(owner());
		owner.transfer(address(this).balance);
	}
	function buildPlayer(string memory name) public {
		uint256 rLevel = rNumber(50);
		uint256 rStrength = rNumber(999);
		uint256 rMagic = rNumber(998);
		uint256 rVitality = rNumber(997);
		uint256 rSpirit = rNumber(996);
		uint256 rLuck = rNumber(995);
		uint256 rSpeed = rNumber(994);
		Player memory addPlayer = Player(name,rLevel, rStrength, rMagic, rVitality, rSpirit, rLuck, rSpeed);
		players.push(addPlayer);
		_mint(msg.sender, Total);
		emit CreatePlayer(msg.sender, rLevel, rStrength, rMagic, rVitality, rSpirit, rLuck, rSpeed);
		Total++;
	}
	function cost(string memory name) public payable {
		require(msg.value >= Fee);
		buildPlayer(name);
	}
	function obtainPlayers() internal view returns (Player[] memory) {
		return players;
	}
	function obtainOwnerPlayers(address owner) public view returns(Player[] memory) {
		Player[] memory result = new Player[](balanceOf(owner));
		uint256 total = 0;
		for(uint256 i = 0; i < players.length; i++) {
			if(ownerOf(i) == owner) {
				result[total] = players[i];
				total++;
			}
		}
		return result;
	}
	function levelIncrease(uint256 playerId) public {
		require(ownerOf(playerId) == msg.sender);
		Player storage player = players[playerId];
		player.Level++;
	}
}