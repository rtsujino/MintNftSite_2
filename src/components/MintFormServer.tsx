"use client"; // This is a client component 

interface MintFormServerProps {
    contractAddress: string;
  }
  
  export function MintFormServer({ contractAddress }: MintFormServerProps) {
    return (
      <div>
        <h3>Mint NFT</h3>
        <p>Connect your wallet to mint NFTs</p>
      </div>
    );
  }
  