export type AbiType = [
  {
    inputs: []
    stateMutability: 'nonpayable'
    type: 'constructor'
  },
  {
    inputs: []
    name: 'getBalance'
    outputs: [
      {
        internalType: 'uint256'
        name: ''
        type: 'uint256'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'getBid'
    outputs: [
      {
        internalType: 'uint256'
        name: ''
        type: 'uint256'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'getCommission'
    outputs: [
      {
        internalType: 'uint8'
        name: ''
        type: 'uint8'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'getImplementationAddress'
    outputs: [
      {
        internalType: 'address'
        name: ''
        type: 'address'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'getLeaderboard'
    outputs: [
      {
        components: [
          {
            internalType: 'address'
            name: 'wallet'
            type: 'address'
          },
          {
            internalType: 'uint32'
            name: 'wins'
            type: 'uint32'
          },
        ]
        internalType: 'struct JKPLibrary.Player[]'
        name: ''
        type: 'tuple[]'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'getResult'
    outputs: [
      {
        internalType: 'string'
        name: ''
        type: 'string'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: []
    name: 'owner'
    outputs: [
      {
        internalType: 'address'
        name: ''
        type: 'address'
      },
    ]
    stateMutability: 'view'
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'enum JKPLibrary.Options'
        name: 'newChoice'
        type: 'uint8'
      },
    ]
    name: 'play'
    outputs: []
    stateMutability: 'payable'
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256'
        name: 'newBid'
        type: 'uint256'
      },
    ]
    name: 'setBid'
    outputs: []
    stateMutability: 'nonpayable'
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8'
        name: 'newCommission'
        type: 'uint8'
      },
    ]
    name: 'setCommission'
    outputs: []
    stateMutability: 'nonpayable'
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address'
        name: 'newImplementation'
        type: 'address'
      },
    ]
    name: 'upgrade'
    outputs: []
    stateMutability: 'nonpayable'
    type: 'function'
  },
]
