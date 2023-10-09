'use client'

import { useState } from 'react'
import { ethers } from "ethers"
import Getblock from '@/contracts/Storage.abi.json'
import { Button, Flex } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'


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
    <Flex h="100vh" justifyContent="center" alignItems="center" bgColor={`white`}>
      {contractAddress === "" && (
        <Button
          px={4}
          fontSize={'sm'}
          rounded={'full'}
          bg={'blue'}
          color={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          onClick={deploy}
          _hover={{
            bg: 'blue',
          }}
          _focus={{
            bg: 'blue',
          }}>
          Create Contract
        </Button>
      )}
      {contractAddress !== "" && (
        <Box textAlign="center" py={10} px={6}>
          <CheckCircleIcon boxSize={'50px'} color={'green'} />
          <Heading as="h2" size="xl" mt={6} mb={2} color={'black'}>
            {contractAddress}
          </Heading>
        </Box>
      )}
    </Flex>
  )
}
