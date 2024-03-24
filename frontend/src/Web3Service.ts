import Web3 from 'web3'
import ABI from './abi.json'

type LoginResult = {
  account: string
  isAdmin: boolean
}

export async function doLogin(): Promise<LoginResult> {
  if (!window.ethereum) throw new Error('No MetaMask found.')

  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.requestAccounts()

  if (!accounts || !accounts.length)
    throw new Error('Wallet not found/allowed.')

  const contract = new web3.eth.Contract(
    ABI,
    import.meta.env.VITE_CONTRACT_ADDRESS,
    { from: accounts[0] },
  )
  const accountChecksumAddress = web3.utils.toChecksumAddress(accounts[0])
  const ownerAddress: string = await contract.methods.owner().call()

  localStorage.setItem('account', accountChecksumAddress)
  localStorage.setItem('isAdmin', `${accountChecksumAddress === ownerAddress}`)

  return {
    account: accountChecksumAddress,
    isAdmin: accountChecksumAddress === ownerAddress,
  } as LoginResult
}
