import { AspectRatio, Box, Button, Flex, Text } from "@chakra-ui/react";

export default function DynamicLecture() {
    return (
        <Box pb="40px" bg="rgb(243,244,246)">
            <Box mb="30px" px="4%" py="2%" bg="white">
                <Text fontSize="25px" fontWeight="bold" fontFamily="sans-serif">Graph-3</Text>
            </Box>
            <Box pb="30px" bg="white" margin="auto" w="90%" >
              <Flex>
                <Button  variant='outline' w="50%">Details</Button>
                <Button  variant='outline' w="50%">Discussions</Button>
              </Flex>
              <Text mb="30px" mt="25px" color="rgb(79,70,229)" fontWeight="medium" fontSize="23px" textAlign="center">LECTURE VIDEO</Text>
              
              
<AspectRatio m="auto" maxW='760px' >
  <iframe
    title='naruto'
    src='https://www.youtube.com/embed/QhBnZ6NPOY0'
    allowFullScreen
  />
</AspectRatio>
<Text mb="30px" mt="25px" color="rgb(79,70,229)" fontWeight="medium" fontSize="23px" textAlign="center">NOTES</Text>
<Box  w="80%" m="auto">
    <Text textAlign="center">study well</Text>
</Box>
<Box>
              </Box>
            </Box>
        </Box>
    )
}