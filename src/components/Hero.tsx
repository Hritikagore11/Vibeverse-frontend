import {
    Box,
    Heading,
    Text,
    Button,
    Stack,
    VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';

export default function Hero() {
    const navigate = useNavigate();

    return (
        <Box
            id="home"
            minH="100vh"
            position="relative"
            bg="#1a1a1a"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={[4, 6, 12]}
            pt={[16, 20, 24]}
            overflow="hidden"
        >
            {/* Aura Background */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width={{ base: '120vw', md: '90vw' }}
                height={{ base: '120vw', md: '90vw' }}
                bg={`radial-gradient(
          circle,
          rgba(255, 115, 180, 0.35) 0%,
          rgba(255, 105, 190, 0.2) 40%,
          rgba(26, 26, 26, 0.9) 100%
        )`}
                filter="blur(120px)"
                borderRadius="full"
                zIndex={0}
                transition="all 0.4s ease"
            />

            {/* Hero Content */}
            <VStack spacing={[6, 8]} textAlign="center" zIndex={1} maxW="800px">
                <Heading
                    fontSize={['3xl', '4xl', '6xl']}
                    fontWeight="bold"
                    lineHeight="1.2"
                    color="white"
                >
                    Let Your Mood <br />
                    <Text
                        as="span"
                        bgGradient="linear(to-r, pink.300, purple.500)"
                        bgClip="text"
                    >
                        Choose the Music
                    </Text>
                </Heading>

                <Text fontSize={['md', 'lg', 'xl']} color="gray.300" px={[2, 6]}>
                    Detect your mood and get perfectly matched songs using face or text.
                </Text>

                {/* Buttons */}
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={[4, 6]}
                    pt={2}
                >
                    <Button
                        size="lg"
                        px={[6, 10]}
                        py={[4, 6]}
                        bg="pink.500"
                        color="white"
                        rounded="full"
                        fontWeight="bold"
                        onClick={() => navigate('/select-mode')}
                        _hover={{
                            transform: 'translateY(-3px)',
                            bg: 'pink.600',
                            shadow: 'lg',
                        }}
                        transition="all 0.3s ease"
                    >
                        Get Started
                    </Button>
                    <Link to="how-it-works" smooth={true} duration={600} offset={-80}>
                        <Button
                            size="lg"
                            variant="outline"
                            rounded="full"
                            border="1px solid"
                            borderColor="gray.500"
                            color="gray.300"
                            _hover={{
                                bg: 'whiteAlpha.100',
                                transform: 'translateY(-2px)',
                                shadow: 'md',
                            }}
                            transition="all 0.3s ease"
                        >
                            How it Works
                        </Button>
                    </Link>
                </Stack>

                {/* Feature Tags */}
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={[3, 8]}
                    fontSize={['sm', 'md']}
                    pt={[4, 6]}
                >
                    <Text color="blue.300">● Face Detection</Text>
                    <Text color="purple.300">● Text Analysis</Text>
                    <Text color="pink.300">● Smart Playlists</Text>
                </Stack>
            </VStack>

            {/* Bottom Fade */}
            <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                h="80px"
                bgGradient="linear(to-t, #1a1a1a, transparent)"
                zIndex={2}
            />
        </Box>
    );
}
