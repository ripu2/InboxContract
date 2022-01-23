pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string intialMeassage) public {
        message = intialMeassage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}