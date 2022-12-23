import { Box,  Flex, FormControl, FormLabel, Heading, HStack, Input,  Select,  Stack, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link"
import axios from "axios"
import { useContext, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    PinInput,
    PinInputField,
    Button
  } from '@chakra-ui/react'
import AuthContext from "../Context/AuthContext";
import { signupAPI } from "../store/Auth/auth.action";
import { useRouter } from 'next/router'

export default function signup()
{
  const dispatch=useDispatch()
  let id =useSelector(store=>store.auth.id)
    const {isOpen, onOpen, onClose } = useDisclosure ()
    // const {setuserId,userId} = useContext(AuthContext)
    const init={
        name:"",
        email:"",
        password:"",
        
    }
  
    const [data,setData]=useState(init)
    const [idnew,setidnew]=useState("")
    const [otp,setOtp]=useState("")
  const [open,setOpen]=useState(false)
  const router=useRouter()
    const handledata=(e)=>{
        const {value,name}=e.target;
        setData({...data,[name]:value})
    }
    console.log(data)

    
   
    const handlesubmit=(e)=>{
       
e.preventDefault()

console.log("6")
dispatch(signupAPI(data))
.then(res=>{
  // setuserId(res.data.newUs
     
    console.log(res)
    setidnew(res.newUser._id)
    id=res.newUser._id
    console.log(id)
    if(res.Status=="Panding")
{
setOpen(true)

}
})
.catch(e => if(e.message==="EmailID already exists")
{
  toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
}
)

    }

    const handelverify=()=>{
      console.log(idnew)
      axios.post("http://localhost:3000/api/verifyotp",{otp,userId:idnew}).then(res=>
      {console.log(res.data)
       if(res.Status="Verifed")
       {
        router.push("/login")

       }
      })

    }


   const handelsubmitotp=()=>{
    handelverify()
   }
    return (
      
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

      

        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} fontWeight="bold" color={'red.600'}>
            A great place for Learning ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <form onSubmit={handlesubmit}  >
            <HStack>
           
              <Box>
                
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" name='name' placeholder={"NAME"}  onChange={handledata}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" placeholder={"LAST NAME"}   />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"  name='email' placeholder={"Email"}  onChange={handledata}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
             <Input name='password' type="password" placeholder={"Password"}  onChange={handledata} />
                 </FormControl>
                
          
              <Input type="submit" value="Sign in" mt="20px" bg="cornflowerblue" />
               
             
            
          
              
               <Flex justifyContent="center"><Text>Already a user?</Text><Text color="blue.400"> <Link href="/login" >Login</Link></Text></Flex> 
             
            
            </form>
          </Stack>
        
        </Box>
      </Stack>
      <Box>
      <Modal isOpen={open} onClose={onClose}   >
        <ModalOverlay  />
        <ModalContent bg="black" height="600px" width="400px">
          
          <ModalCloseButton color="grey" />
          <ModalBody>
        <Box >
<Heading color="white">Enter Your OTP</Heading>


           <Text marginTop="20" color="white">Please Check youe email,We have just sent you an otp for email verification...</Text> 
        
            <FormControl>
  <FormLabel color="white"></FormLabel>
  <HStack>
  <PinInput >
    <Input  color="white" onChange={(e)=>setOtp(e.target.value)}/>
   
  </PinInput>
</HStack>
  
  <Button marginLeft={10} marginTop={5} w={250} onClick={handelsubmitotp}> Submit</Button>
</FormControl>
        </Box>
          </ModalBody>

          
            
          
        </ModalContent>
      </Modal>
      </Box>
    </Flex>
    )
}