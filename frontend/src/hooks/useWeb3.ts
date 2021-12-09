import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from 'utils/web3'

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [web3, setweb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== refEth.current) {
      const _web3 = library ? new Web3(library) : getWeb3NoAccount()
      setweb3(_web3)
      refEth.current = library

      // _web3.eth.subscribe('logs', {
      //   address: '0x524753f3ba40639dd970CC1cE940867afCC6c622',
      //   topics: ['0x69ca02dd4edd7bf0a4abb9ed3b7af3f14778db5d61921c7dc7cd545266326de2']
      // }, function (error, result) {
      //   if (!error)
      //     console.log(result);
      // });

    }
  }, [library])

  return web3
}

export default useWeb3
