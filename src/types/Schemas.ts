export enum Schemas {
  ERC721="ERC721 (Coming soon...)",
  ERC1456="ERC1456 (Coming soon...)",
  SELF_ATTESTED="Self-attested",
  GENERIC="Generic",
}

export interface ERC1456 {
  version: number
  address: string
  submission: Submission
  metadata: Metadata
  contract: Contract
  standards: Standards
  reputation: Reputation
}

interface Contract {
  name: string
  abi: string
  source: string
  compiler: string
  language: string
  optimizer: number
  swarm: string
  constructor_arguments: string
}

interface Standards {
  20: ERC20
  721: ERC721
}

interface ERC20 {
  version: number
  ticker: string
  decimals: number
}

interface ERC721 {
  version: number
}

interface Reputation {
  status: string
  tags: ERC1456Tags[]
  description: string
  addresses: string[]
  related: string[]
}

interface Submission {
  comments: string
  ipfs: string[]
}

interface Metadata {
  name: string
  url: string
  logo: string
  description: string
  ens: string
  contact: Contact
}

interface Contact {
  email: string
  peepeth: string
  press: string
  support: string
}

enum ERC1456Tags {
  SCAM="scam",
  PONZI="ponzi",
  BINANCE="binance"
}

