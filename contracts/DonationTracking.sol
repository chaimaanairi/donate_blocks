// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

contract DonationTracking {
    
    address[] public deployedDonationEvents;

    event donationEventCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address donationEventAddress,
        string imgURI,
        uint indexed timestamp,
        string indexed category
    );

    function createDonationEvent(
        string memory donationEventTitle, 
        uint requiredDonationEventAmount, 
        string memory imgURI, 
        string memory category,
        string memory storyURI) public
    {

        DonationEvent newDonationEvent = new DonationEvent(
            donationEventTitle, requiredDonationEventAmount, imgURI, storyURI, msg.sender);
        

        deployedDonationEvents.push(address(newDonationEvent));

        emit donationEventCreated(
            donationEventTitle, 
            requiredDonationEventAmount, 
            msg.sender, 
            address(newDonationEvent),
            imgURI,
            block.timestamp,
            category
        );

    }
}


contract DonationEvent {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory donationEventTitle, 
        uint requiredDonationEventAmount, 
        string memory imgURI,
        string memory storyURI,
        address donationEventOwner
    ) {
        title = donationEventTitle;
        requiredAmount = requiredDonationEventAmount;
        image = imgURI;
        story = storyURI;
        owner = payable(donationEventOwner);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount, "required amount fullfilled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}