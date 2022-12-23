import { Alert,
    AlertIcon,
      Button,
      Checkbox,
      Flex,
      FormControl,
      FormLabel,
      Heading,
      Input,
      Link,
      Stack,
      Image,
      Spinner,
      Text,
      Box,
      useDisclosure,
      HStack
     
    } from '@chakra-ui/react';
    import {
      Modal,
      ModalOverlay,
      ModalContent,
      ModalBody,
      ModalCloseButton,
      PinInput,
      PinInputField,
      
    } from '@chakra-ui/react'
import { useContext, useState } from 'react';
// import AuthContext  from '../Context/AuthContext';
import axios from "axios"
// import jwt from "jsonwebtoken"
import AuthContext from '../Context/AuthContext';
import { useDispatch,useSelector } from 'react-redux';
import { signinAPI } from '../store/Auth/auth.action';
import { useRouter } from 'next/router'

export default function login()
{
  const init={
        
    email:"",
    password:"",
   
  }
  const router = useRouter()
    const toast = useToast()
const {isAuth,token,id,email}=useSelector((store) => store.auth)
console.log(isAuth,token,id)
 
const [open,setOpen]=useState(false)
const {isOpen, onOpen, onClose } = useDisclosure()
const dispatch=useDispatch()

const [data,setData]=useState(init)
const [pass,setPass]=useState({
  otp:"",
  newpass:""
})
   
    const handelpassword=()=>{
      axios.post("http://localhost:3000/api/forgotpassword",{id})
      .then(res=>
        {console.log(res)
          setOpen(true)
          
        })
      .catch(e=>console.log(e))
    }
    const handlepass=(e)=>{
      const {value,name}=e.target;
        setPass({...pass,[name]:value})
    }

   const handlesubmitotp=(e)=>{
    e.preventDefault()
    console.log(pass)

    axios.post("http://localhost:3000/api/verifypassword",{id:id,password:pass.newpass,otp:pass.otp})
    .then(res=>{
      console.log(res.data)
      if(res.data.status=="Verifed")
  {alert("hogya bhai")
  }})
   }
    const handledata=(e)=>{
        const {value,name}=e.target;
        setData({...data,[name]:value})
    }
  

    const handlesubmit=(e)=>{
       e.preventDefault()
     dispatch(signinAPI(data))
.then(res=>{
  console.log(res)


}
)
.catch(e=>{if(e.message=="EmailID already exists")
{
  toast({
    title: 'Email already exist.',
    status: 'success',
    duration: 3000,
    isClosable: true,
  })
}})

    }
  
    return (
<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
       
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
        
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            
         <form onSubmit={handlesubmit}>
            <FormControl >
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' onChange={handledata}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name='password'  onChange={handledata}/>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.500'} onClick={handelpassword}>Forgot password?</Link>
              </Stack>

  <Input type='submit' value="Login"/>

            
            </Stack>
          </form>

          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2Nob29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        </Flex>
        <Box>
        <Modal isOpen={open} onClose={onClose}  >
        <ModalOverlay  />
        <ModalContent bg="black" height="600px" width="400px">
          
          <ModalCloseButton color="grey"  />
          <ModalBody>
        <Box >
<Heading color="white">Enter Your New Password</Heading>


           <Text marginTop="20" color="white">Enter Your Otp & new password</Text> 
        
            <FormControl>
  <FormLabel color="white"></FormLabel>
  <HStack >
 
    <Input  color="white" name="otp" onChange={handlepass} placeholder="Enter your otp" />
    <Input  color="white" name="newpass" onChange={handlepass} placeholder="Enter your New Password"/>
  
</HStack>
  
  <Button marginLeft={10} marginTop={5} w={250} onClick={handlesubmitotp}> Submit</Button>
</FormControl>
        </Box>
          </ModalBody>

          
            
          
        </ModalContent>
      </Modal>
      </Box>
      </Stack>
    );
  }
    
