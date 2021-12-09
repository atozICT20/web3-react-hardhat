import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'

// Addresses
import {
  getContractAddress,
} from 'utils/addressHelpers'

// ABI
import contractAbi from 'contracts/abi/Token.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getCustomContract = (web3?: Web3) => {
  return getContract(contractAbi, getContractAddress(), web3)
}


export const subscribeLogEvent = (web3: Web3, contract: any, eventName: string) => {
  const _web3 = web3 ?? web3NoAccount
  const jsonInterface = contract.options.jsonInterface
  const eventJsonInterface = jsonInterface.find(o => o.name === eventName && o.type === 'event')

  _web3.eth.subscribe('logs', {
    address: contract.options.address,
    topics: [eventJsonInterface.signature]
  }, (error, result) => {
      if (!error) {
        const eventObj = _web3.eth.abi.decodeLog(
            eventJsonInterface.inputs,
            result.data,
            result.topics.slice(1)
          )
        console.log(`New ${eventName}!`, eventObj)
      } else {
        console.log(error)
      }
  })
}