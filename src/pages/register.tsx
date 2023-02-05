import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Input from '../components/form-elements/input'
import Select from '../components/form-elements/select'
import Button from '../components/form-elements/button'
import Header from '../components/form-components/Header'
import ABI from '../contracts/polygonID_ABI.json'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useToast } from '@chakra-ui/react'


const Register: NextPage = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState(0);

  const toast = useToast()

  const roles = [
    { name: 'Manufacturer', value: 'manufacturer' },
    { name: 'Distributor', value: 'distributor' },
  ]
  const { config } = usePrepareContractWrite({
    address: '0x4e90677555F6Ef8136075ec5A00230Dd41F5A2e8',
    abi: ABI,
    functionName: 'addUser',
    args: [name, role],
  })
  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User Registered",
        description: "User has been registered successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }
  }, [isSuccess])

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="LogChain - Register" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-4 md:px-0 mx-auto max-w-[1080px]">
        <div className="max-w-7xl mt-5 pt-5 pb-5 mx-auto">
          <Header heading="Register" />
          <div className="flex flex-col md:flex-row text-center w-full">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:p-4 overflow-x-hidden overflow-y-auto md:inset-0 justify-center flex md:h-full">
              <div className="relative w-full h-full md:h-auto">
                <div className="relative rounded-lg shadow-lg backdrop-blur-lg bg-white/30 bg-opacity-40 dark:bg-gray-700/40">
                  <div className="px-6 py-6 lg:px-8">
                    <form className="space-y-6">
                      <Input
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Select
                        id="roles"
                        name="roles"
                        label="Roles"
                        placeholder="Select role"
                        options={roles}
                        onChange={(event) => { setRole(event.target.selectedIndex - 1) }}
                      />
                      <Button label="Register" onClick={() => {
                            write?.()
                          }} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image src="/register.png" className="rounded-full -mt-9" width="500" height="400" alt="Register" />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Register