import { Box, Heading, Text, VStack, Image } from '@chakra-ui/react';

export default function About() {
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
                <VStack spacing={6} color="white">
                    {/* 📷 Image Section */}
                    <Image
                        src="/public/about.png"
                        alt="About Banner"
                        borderRadius="xl"
                        objectFit="cover"
                        width="100%"
                        maxH="300px"
                        fallbackSrc="https://via.placeholder.com/600x300?text=VibeVerse"
                    />

                    {/* 📘 Text Section */}
                    <Heading
                        size="xl"
                        bgGradient="linear(to-r, pink.400, purple.400)"
                        bgClip="text"
                        textAlign="center"
                    >
                        ℹ️ About VibeVerse
                    </Heading>
                    <Text fontSize="md" color="gray.300" textAlign="center">
                        VibeVerse is a smart, mood-reactive music player that detects your emotion via photo or text and plays songs accordingly.
                        <br /><br />
                        Built using React, Chakra UI, FastAPI, MongoDB, DeepFace & DistilRoBERTa — designed to personalize your music experience with AI.
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
}
