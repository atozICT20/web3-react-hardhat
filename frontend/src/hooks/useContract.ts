import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getCustomContract
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useCustom = () => {
  const web3 = useWeb3()
  return useMemo(() => getCustomContract(web3), [web3])
}
