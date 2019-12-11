import bs58 from 'bs58';
import sha3 from 'crypto-js/sha3';
import { ethers } from 'ethers';
import UncheckedJsonRpcSigner from './signer';

export function getProviderOrSigner(library, account) {
  return account ? new UncheckedJsonRpcSigner(library.getSigner(account)) : library
}

export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === ethers.constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new ethers.Contract(address, ABI, getProviderOrSigner(library, account))
}

/**
 * https://github.com/ethereum/go-ethereum/blob/aa9fff3e68b1def0a9a22009c233150bf9ba481f/jsre/ethereum_js.go
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isChecksumAddress = function(address) {
    // Check each case
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if the given string is a Base58 encodable string within the multihash length/size limit
 *
 * @method canConvertToBase58
 * @param {String} hash the given ipfs hash
 * @return {Boolean}
*/
// TODO: Type all errors and prettify console output
export const canConvertToBase58 = (hash) => {
  try {
    const multihash = getBytes32FromMultihash(hash);
    return hash === getMultihashFromBytes32(multihash);
  } catch(e) {
    console.log(e);
  }

  return false;
};

/**
 * @typedef {Object} Multihash
 * @property {string} digest The digest output of hash function in hex with prepended '0x'
 * @property {number} hashFunction The hash function code for the function used
 * @property {number} size The length of digest
 */

/**
 * Partition multihash string into object representing multihash
 *
 * @param {string} multihash A base58 encoded multihash string
 * @returns {Multihash}
 */
export function getBytes32FromMultihash(multihash) {
  const decoded = bs58.decode(multihash);

  return {
    digest: `0x${decoded.slice(2).toString('hex')}`,
    hashFunction: decoded[0],
    size: decoded[1],
  };
}

/**
 * Encode a multihash structure into base58 encoded multihash string
 *
 * @param {Multihsh} multihash
 * @returns {(string|null)} base58 encoded multihash string
 */
export function getMultihashFromBytes32(multihash) {
  const { digest, hashFunction, size } = multihash;
  if (size === 0) return null;

  // cut off leading "0x"
  const hashBytes = Buffer.from(digest.slice(2), 'hex');

  // prepend hashFunction and digest size
  const multihashBytes = new (hashBytes.constructor)(2 + hashBytes.length);
  multihashBytes[0] = hashFunction;
  multihashBytes[1] = size;
  multihashBytes.set(hashBytes, 2);

  return bs58.encode(multihashBytes);
}

/**
 * Parse Solidity response in array to a Multihash object
 *
 * @param {Object} response Response object with named keys from Solidity experimental pragma :)
 * @returns {Multihash} multihash object
 */
export function parseContractResponse(response) {
  const { digest, hashFunction, size } = response;
  return {
    digest,
    hashFunction: hashFunction.toNumber(),
    size: size.toNumber(),
  };
}

/**
 * Parse Solidity response in array to a base58 encoded multihash string
 *
 * @param {array} response Response array from Solidity
 * @returns {string} base58 encoded multihash string
 */
export function getMultihashFromContractResponse(response) {
  return getMultihashFromBytes32(parseContractResponse(response));
}
