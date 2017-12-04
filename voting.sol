pragma solidity ^0.4.17;

contract Voting {
  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidateList;

  function Voting(bytes32[] candidateNames) {
    candidateList = candidateNames;
  }

  function totalVotes(bytes32 candidate) returns (uint8) {
    return votesReceived[candidate];
  }

  function castVote(bytes32 candidate) {
    if (validCandidate(candidate) == true) {
      votesReceived[candidate] += 1;
    }
  }

  function verify(bytes32 hash, bytes32 payload) constant returns(bool) {
    return sha3(payload) == hash;
  }

  function validCandidate(bytes32 candidate) returns (bool) {

    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }

    return false;
  }
}
