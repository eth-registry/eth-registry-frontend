import { useState, useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector';
import { injected, walletconnect } from './connectors'
import { getContract, isAddress } from './helpers/index.js';
import METADATA_REGISTRY_ABI from './abis/MetadataRegistry.json';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, []);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React()

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}

export function useBlockListener() {
  const { library, chainId } = useWeb3React();
  // set up block listener
  const [blockNumber, setBlockNumber] = useState();
  useEffect((): any => {
    if (library) {
      let stale = false;

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      }
      library.on('block', updateBlockNumber);

      return () => {
        library.removeListener('block', updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      }
    }
  }, [blockNumber, library, chainId]);
}

export function useEthBalanceUpdate() {
  const { account, library, chainId } = useWeb3React();
   // fetch eth balance of the connected account
   const [ethBalance, setEthBalance] = useState();
   useEffect((): any => {
     if (library && account) {
       let stale = false;
 
       library
         .getBalance(account)
         .then((balance: any) => {
           if (!stale) {
             setEthBalance(balance);
           }
         })
         .catch(() => {
           if (!stale) {
             setEthBalance(null);
           }
         });
 
       return () => {
         stale = true;
         setEthBalance(undefined);
       }
     }
   }, [ethBalance, library, account, chainId]);
}

export function useWalletConnectURI() {
  // log the walletconnect URI
  useEffect(() => {
    const logURI = (uri: any) => {
      console.log('WalletConnect URI', uri);
    }
    walletconnect.on(URI_AVAILABLE, logURI);
    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    }
  }, []);
}

export function useRegistryContract(registryAddress: string, withSignerIfPossible: boolean = true) {
  const { library, account } = useWeb3React()

  return useMemo(() => {
    try {
      return getContract(registryAddress, METADATA_REGISTRY_ABI, library, withSignerIfPossible ? account : undefined);
    } catch (e) {
      return e;
    }
  }, [registryAddress, library, withSignerIfPossible, account])
}

export function useENSName(address: string) {
  const { library } = useWeb3React();

  const [ENSName, setENSName] = useState();

  useEffect(() => {
    if (isAddress(address)) {
      let stale = false;
      try {
        library.lookupAddress(address).then( (name: string) => {
          if (!stale) {
            if (name) {
              setENSName(name);
            } else {
              setENSName(null);
            }
          }
        })
      } catch {
        setENSName(null);
      }

      return () => {
        stale = true;
        setENSName(null);
      }
    }
  }, [library, address])

  return ENSName
}
