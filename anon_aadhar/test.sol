// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "@anon-aadhaar/contracts/interfaces/IAnonAadhaar.sol";
import "@anon-aadhaar/contracts/interfaces/IAnonAadhaarVerifier.sol";

contract VerifiedAadhaarCheck {
    address public anonAadhaarVerifierAddr;

    // Mapping to track if a user has been verified
    mapping(uint256 => bool) public hasBeenVerified;

    // Constructor to set the address of the AnonAadhaarVerifier contract
    constructor(address _verifierAddr) {
        anonAadhaarVerifierAddr = _verifierAddr;
    }

    /// @dev Check if the timestamp is more recent than (current time - 3 hours)
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @return bool
    function isLessThan3HoursAgo(uint timestamp) public view returns (bool) {
        return timestamp > (block.timestamp - 3 * 60 * 60);
    }

    /// @dev Check if the Aadhaar proof is valid and recent
    /// @param identityNullifier: Hash of last 4 digits + DOB, name, gender, and pin code.
    /// @param userNullifier: Hash of last 4 digits + photo.
    /// @param timestamp: Timestamp of when the QR code was signed.
    /// @param signal: Signal used while generating the proof, should be equal to msg.sender.
    /// @param groth16Proof: SNARK Groth16 proof.
    function checkVerifiedAadhaar(uint identityNullifier, uint userNullifier, uint timestamp, uint signal, uint[8] memory groth16Proof) public view returns (bool) {
        require(address(this) == msg.sender, "Function can only be called by this contract");
        require(isLessThan3HoursAgo(timestamp), "Proof must be generated with Aadhaar data less than 3 hours ago");
        return IAnonAadhaarVerifier(anonAadhaarVerifierAddr).verifyAadhaarProof(identityNullifier, userNullifier, timestamp, signal, groth16Proof);
    }

    // Function to check if a user has been verified
    function hasBeenVerifiedAadhaar(uint256 _nullifier) public view returns (bool) {
        return hasBeenVerified[_nullifier];
    }
}
