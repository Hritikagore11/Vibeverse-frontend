import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function MyVibes() {
    return (
        <Box
            minH="100vh"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            pt="120px"
            pb={16}
            px={6}
            fontFamily="'Poppins', sans-serif"
        >
            <Box
                maxW="600px"
                mx="auto"
                p={6}
                borderRadius="2xl"
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                boxShadow="0 8px 24px rgba(0, 0, 0, 0.4)"
            >
                <VStack spacing={4} color="white">
                    <Heading
                        size="xl"
                        bgGradient="linear(to-r, pink.400, purple.400)"
                        bgClip="text"
                        textAlign="center"
                    >
                        🎧 My Vibes
                    </Heading>
                    <Text fontSize="md" textAlign="center" color="gray.300">
                        Here you'll see your mood detection history, saved songs, and vibe-based suggestions in future updates.
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
}
