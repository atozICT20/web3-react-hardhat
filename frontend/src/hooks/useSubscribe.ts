import { useCallback } from 'react'
import useWeb3 from 'hooks/useWeb3'
import { useCustom } from './useContract'
import {
  subscribeLogEvent,
} from 'utils/contractHelpers'

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useSubscribe = () => {
  const web3 = useWeb3()
  const customContract = useCustom()

  const handleSubscribe = useCallback(
    () => {
      subscribeLogEvent(web3, customContract, 'Transfer')
    },
    [web3, customContract]
  )

  return { subscribe: handleSubscribe }
}

export default useSubscribe
