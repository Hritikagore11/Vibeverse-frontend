import { Box, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import { Camera, Brain, Music } from 'lucide-react';

const steps = [
    {
        id: 1,
        icon: Camera,
        title: 'Detect Mood',
        description: 'Upload a selfie or answer a few questions to know your mood.',
        gradient: 'linear(to-br, #ff6699, #d66fb3)',
    },
    {
        id: 2,
        icon: Brain,
        title: 'Analyze Emotion',
        description: 'We detect your emotions with AI-powered sentiment analysis.',
        gradient: 'linear(to-br, #d66fb3, #aa66cc)',
    },
    {
        id: 3,
        icon: Music,
        title: 'Play Music',
        description: 'Get songs that vibe perfectly with how you feel.',
        gradient: 'linear(to-br, #aa66cc, #ff9966)',
    },
];

export default function HowItWorks() {
    return (
        <Box
            id="how-it-works"
            position="relative"
            py={[16, 20, 24]}
            px={[4, 6, 12]}
            bg="#1b1b1f"
        >
            {/* Aura Glows */}
            <Box
                position="absolute"
                top="10%"
                left="10%"
                w={['200px', '250px', '300px']}
                h={['200px', '250px', '300px']}
                bg="#ff66a3"
                rounded="full"
                filter="blur(140px)"
                zIndex={0}
                opacity={0.25}
            />
            <Box
                position="absolute"
                bottom="5%"
                right="10%"
                w={['180px', '230px', '280px']}
                h={['180px', '230px', '280px']}
                bg="#ff9966"
                rounded="full"
                filter="blur(120px)"
                zIndex={0}
                opacity={0.2}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={['160px', '200px', '220px']}
                h={['160px', '200px', '220px']}
                bg="#aa66cc"
                rounded="full"
                filter="blur(100px)"
                zIndex={0}
                opacity={0.2}
            />

            {/* Title & Subtitle */}
            <VStack spacing={4} textAlign="center" mb={16} position="relative" zIndex={1}>
                <Heading fontSize={['2xl', '3xl', '4xl']} color="#ff66a3">
                    How It Works
                </Heading>
                <Text fontSize={['md', 'lg']} color="whiteAlpha.700">
                    Discover music that matches your mood in three simple steps
                </Text>
            </VStack>

            {/* Cards */}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={[6, 8, 10]} position="relative" zIndex={1}>
                {steps.map((step) => (
                    <Box
                        key={step.id}
                        bgGradient={step.gradient}
                        p={[6, 8]}
                        rounded="2xl"
                        boxShadow="dark-lg"
                        position="relative"
                        overflow="hidden"
                        _hover={{
                            transform: 'translateY(-6px)',
                            transition: 'all 0.3s ease',
                            boxShadow: 'xl',
                        }}
                    >
                        <Box
                            position="absolute"
                            inset={0}
                            bg="blackAlpha.300"
                            backdropFilter="blur(14px)"
                            zIndex={0}
                        />

                        <VStack spacing={4} position="relative" zIndex={1} textAlign="center">
                            <Box
                                bg="whiteAlpha.300"
                                p={5}
                                rounded="2xl"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <step.icon size={36} color="white" />
                            </Box>
                            <Heading size="md" color="white">
                                {step.title}
                            </Heading>
                            <Text color="whiteAlpha.900" fontSize={['sm', 'md']}>
                                {step.description}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>

            <Text
                textAlign="center"
                fontSize={['md', 'lg']}
                color="whiteAlpha.600"
                mt={[12, 16]}
                position="relative"
                zIndex={1}
            >
                Ready to discover your perfect soundtrack?
            </Text>
        </Box>
    );
}
