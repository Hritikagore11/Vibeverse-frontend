import {
    Box,
    Heading,
    Text,
    Wrap,
    WrapItem,
    Card,
    CardBody,
    Icon,
    Divider,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaImage, FaCommentDots } from 'react-icons/fa';

export default function SelectMode() {
    const navigate = useNavigate();

    const handleSelect = (mode: 'image' | 'text') => {
        navigate(`/detect/${mode}`);
    };

    return (
        <Box
            minH="100vh"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            pt={{ base: '150px', md: '100px' }} // navbar safe space
            pb={16}
            px={{ base: 4, md: 8, lg: 12 }}
            fontFamily="'Poppins', sans-serif"
        >
            <Box textAlign="center" mb={12}>
                <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} mb={4} color="#ff6699">
                    How would you like to detect your mood?
                </Heading>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.700">
                    Choose a detection mode below to get started.
                </Text>
            </Box>

            <Wrap spacing={{ base: 6, md: 10 }} justify="center">
                {/* Image Mode */}
                <WrapItem>
                    <Card
                        bg="#2d1c27"
                        minH="400px"
                        px={8}
                        py={10}
                        borderRadius="2xl"
                        border="1px solid rgba(255,255,255,0.08)"
                        transition="transform 0.3s ease, box-shadow 0.3s ease"
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 30px rgba(255,102,153,0.35)',
                            cursor: 'pointer',
                            bg: '#3b2533',
                        }}
                        onClick={() => handleSelect('image')}
                        maxW="340px"
                        w="100%"
                    >
                        <CardBody>
                            <VStack spacing={3} textAlign="center">
                                <Icon as={FaImage} w={14} h={14} color="#ff6699" />
                                <Heading fontSize="2xl" color="white">Image Mode</Heading>
                                <Divider borderColor="whiteAlpha.300" my={2} />
                                <Text color="whiteAlpha.800" fontSize="md">
                                    Upload an image or click a selfie.
                                </Text>
                                <Text color="whiteAlpha.800" fontSize="md">
                                    AI analyzes your emotion.
                                </Text>
                                <Text color="whiteAlpha.800" fontSize="md">
                                    Songs based on your mood.
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                </WrapItem>

                {/* Text Mode */}
                <WrapItem>
                    <Card
                        bg="#2d1c27"
                        minH="400px"
                        px={8}
                        py={10}
                        borderRadius="2xl"
                        border="1px solid rgba(255,255,255,0.08)"
                        transition="transform 0.3s ease, box-shadow 0.3s ease"
                        _hover={{
                            transform: 'scale(1.05)',
                            boxShadow: '0 0 30px rgba(255,102,153,0.35)',
                            cursor: 'pointer',
                            bg: '#3b2533',
                        }}
                        onClick={() => handleSelect('text')}
                        maxW="340px"
                        w="100%"
                    >
                        <CardBody>
                            <VStack spacing={3} textAlign="center">
                                <Icon as={FaCommentDots} w={14} h={14} color="#ff6699" />
                                <Heading fontSize="2xl" color="white">Text Mode</Heading>
                                <Divider borderColor="whiteAlpha.300" my={2} />
                                <Text color="whiteAlpha.800" fontSize="md">
                                    Answer 5 quick questions.
                                </Text>
                                <Text color="whiteAlpha.800" fontSize="md">
                                    Sentiment is analyzed.
                                </Text>
                                <Text color="whiteAlpha.800" fontSize="md">
                                    Songs curated for your mood.
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                </WrapItem>
            </Wrap>
        </Box>
    );
}
