"use client"; // This is a client component
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface MintFormClientProps {
  contractAddress: string;
}

export function MintFormClient({ contractAddress }: MintFormClientProps) {
  const [provider, setProvider] = useState<any | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [nftQuantity, setNftQuantity] = useState<number>(1);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        const provider = window.ethereum;
        setProvider(provider);

        try {
          await provider.send('eth_requestAccounts', []);
          const address = await provider.request({ method: 'eth_accounts' });
          setAddress(address[0] || null);
          console.log('Successful to connect wallet');
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        console.error('No Ethereum wallet detected');
      }
    };

    initializeProvider();
  }, []);

  const mintNFT = async () => {
    if (!provider || !address) {
      console.error('Wallet not connected');
      return;
    }

    try {
      const transactionPromises = [];

      for (let i = 0; i < nftQuantity; i++) {
        const transactionPromise = provider.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: address,
              to: contractAddress
            }
          ]
        });

        transactionPromises.push(transactionPromise);
      }

      const transactions = await Promise.all(transactionPromises);
      console.log('NFTs minted successfully:', transactions);
    } catch (error) {
      console.error('Failed to mint NFTs:', error);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftQuantity(parseInt(e.target.value));
  };

  return (
    <div className="center-align">
      <h3>Mint NFT</h3>
      {address ? (
        <>
          <p>Connected with address: {address}</p>
          <label>
            Quantity:
            <input className="quantity" type="number" min="1" value={nftQuantity} onChange={handleQuantityChange} />
          </label>
          <div className="mint-button" onClick={mintNFT}>Mint</div>
        </>
      ) : (
        <p>Connect your wallet to mint NFTs</p>
      )}
    </div>
  );
}