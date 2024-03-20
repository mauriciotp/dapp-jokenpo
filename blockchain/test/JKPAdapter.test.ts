import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('JKPAdapter Tests', function () {
  enum Options {
    NONE,
    ROCK,
    PAPER,
    SCISSORS,
  }

  const DEFAULT_BID = hre.ethers.parseEther('0.01')
  const DEFAULT_COMMISSION = 10n

  async function deployFixture() {
    const [owner, player1, player2] = await hre.ethers.getSigners()

    const JoKenPo = await hre.ethers.getContractFactory('JoKenPo')
    const joKenPo = await JoKenPo.deploy()

    const JKPAdapter = await hre.ethers.getContractFactory('JKPAdapter')
    const jkpAdapter = await JKPAdapter.deploy()

    return { joKenPo, jkpAdapter, owner, player1, player2 }
  }

  it('Should get implementation address', async function () {
    const { joKenPo, jkpAdapter } = await loadFixture(deployFixture)

    const address = await joKenPo.getAddress()
    await jkpAdapter.upgrade(joKenPo)
    const implementationAddress = await jkpAdapter.getImplementationAddress()

    expect(address).to.equal(implementationAddress)
  })

  it('Should get bid', async function () {
    const { joKenPo, jkpAdapter } = await loadFixture(deployFixture)

    await jkpAdapter.upgrade(joKenPo)

    const bid = await jkpAdapter.getBid()

    expect(bid).to.equal(DEFAULT_BID)
  })

  it('Should NOT get bid', async function () {
    const { jkpAdapter } = await loadFixture(deployFixture)

    await expect(jkpAdapter.getBid()).to.be.revertedWith(
      'You must upgrade first',
    )
  })

  it('Should get commission', async function () {
    const { joKenPo, jkpAdapter } = await loadFixture(deployFixture)

    await jkpAdapter.upgrade(joKenPo)

    const commission = await jkpAdapter.getCommission()

    expect(commission).to.equal(DEFAULT_COMMISSION)
  })

  it('Should NOT get commission (upgrade)', async function () {
    const { jkpAdapter } = await loadFixture(deployFixture)

    await expect(jkpAdapter.getCommission()).to.be.revertedWith(
      'You must upgrade first',
    )
  })

  it('Should NOT upgrade (permission)', async function () {
    const { joKenPo, jkpAdapter, player1 } = await loadFixture(deployFixture)

    const instance = jkpAdapter.connect(player1)

    await expect(instance.upgrade(joKenPo)).to.be.revertedWith(
      'You do not have permission',
    )
  })

  it('Should NOT upgrade (invalid address)', async function () {
    const { jkpAdapter } = await loadFixture(deployFixture)

    await expect(jkpAdapter.upgrade(hre.ethers.ZeroAddress)).to.be.revertedWith(
      'The address is required',
    )
  })

  it('Should play alone by adapter', async function () {
    const { joKenPo, jkpAdapter, player1 } = await loadFixture(deployFixture)

    await jkpAdapter.upgrade(joKenPo)

    const instance = jkpAdapter.connect(player1)
    await instance.play(Options.PAPER, { value: DEFAULT_BID })

    const result = await instance.getResult()

    expect(result).to.equal('Player 1 choose his/her option. Waiting player 2.')
  })

  it('Should play along by adapter', async function () {
    const { joKenPo, jkpAdapter, player1, player2 } =
      await loadFixture(deployFixture)

    await jkpAdapter.upgrade(joKenPo)

    const instancePlayer1 = jkpAdapter.connect(player1)
    await instancePlayer1.play(Options.PAPER, { value: DEFAULT_BID })

    const instancePlayer2 = jkpAdapter.connect(player2)
    await instancePlayer2.play(Options.ROCK, { value: DEFAULT_BID })

    const result = await instancePlayer1.getResult()

    expect(result).to.equal('Paper wraps rock. Player 1 won.')
  })
})
