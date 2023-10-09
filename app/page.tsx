'use client'

import { useState } from 'react'
import { ethers } from "ethers"
import Getblock from '@/contracts/Storage.abi.json'
import { Button, Flex, useColorModeValue } from '@chakra-ui/react'


export default function Home() {
  const [contractAddress, setContractAddress] = useState("");

  const deploy = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    console.log(provider)
    const signer = provider.getSigner();
    const contractFactory = new ethers.ContractFactory(Getblock.abi, Getblock.bytecode, signer);
    const contract = await contractFactory.deploy();
    console.log(contract.deployTransaction["hash"])
    setContractAddress(contract.address)
  };
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center" bgColor={`#00B5D8`}>
      <Button
        px={8}
        bg={useColorModeValue('#151f21', 'gray.900')}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={deploy}>
        Click Me
      </Button>
      {contractAddress}
    </Flex>
  )
}
