import Web3 from 'web3'
import { HttpProviderOptions, WebsocketProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
// const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
// const web3NoAccount = new Web3(httpProvider)
const wssProvider = new Web3.providers.WebsocketProvider(RPC_URL, { timeout: 10000} as WebsocketProviderOptions)
const web3NoAccount = new Web3(wssProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
