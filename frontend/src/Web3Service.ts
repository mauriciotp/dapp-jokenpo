import Web3 from 'web3'
import ABI from './abi.json'

const ADAPTER_ADDRESS = `${import.meta.env.VITE_CONTRACT_ADDRESS}`

function getWeb3(): Web3 {
  if (!window.ethereum) throw new Error('No MetaMask found.')

  return new Web3(window.ethereum)
}

function getContract(web3?: Web3) {
  if (!web3) web3 = getWeb3()
  return new web3.eth.Contract(ABI, ADAPTER_ADDRESS, {
    from: localStorage.getItem('account') || undefined,
  })
}

type LoginResult = {
  account: string
  isAdmin: boolean
}

export async function doLogin(): Promise<LoginResult> {
  const web3 = getWeb3()
  const accounts = await web3.eth.requestAccounts()
  const checksumAddress = web3.utils.toChecksumAddress(accounts[0])
  console.log('doing login')

  if (!accounts || !accounts.length)
    throw new Error('Wallet not found/allowed.')

  const contract = getContract(web3)
  const ownerAddress: string = await contract.methods.owner().call()

  localStorage.setItem('account', checksumAddress)
  localStorage.setItem('isAdmin', `${checksumAddress === ownerAddress}`)

  return {
    account: checksumAddress,
    isAdmin: checksumAddress === ownerAddress,
  } as LoginResult
}

export function doLogout() {
  localStorage.removeItem('account')
  localStorage.removeItem('isAdmin')
}

export type Dashboard = {
  bid?: string
  commission?: number
  address?: string
}
