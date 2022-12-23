
import {Box,Flex,Image,Button,Spacer,Text} from "@chakra-ui/react"
import Link from "next/link"
export default function Navbar()
{
    return (
        <div><Box  h="60px" bg="purple" pt="10px" borderRadius="20px">
        <Flex justifyContent="space-between" >
          {/* <Image h="60px"  src="https://cdn.freelogodesign.org/files/cee3e6283d16410e84e6254ab2fe4e5b/thumb/logo_200x200.png?v=0"/> */}
         <Text fontSize={"30px"} fontWeight="bold" ml="10px" color="white">Phoenix School</Text>

         <Spacer/>
          <Flex justifyContent="space-around" h="40px" w="300px" ><Link  href="/signup" >Signup</Link><Link hre="/lectures">Lectures</Link></Flex>
          </Flex>
        </Box></div>
    )
}