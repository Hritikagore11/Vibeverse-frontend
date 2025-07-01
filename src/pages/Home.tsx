import {
    Box,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaHeart, FaBrain, FaMusic, FaPalette } from 'react-icons/fa';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
export default function Home() {
    const [darker, setDarker] = useState(false);

    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}>
            <Box
                position="relative"
                bg="white"
                overflow="hidden"
                onClick={() => setDarker(!darker)}
            >
                {/* Aura Background */}
                <Box
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translateX(-50%)"
                    width={{ base: '180vw', md: '150vw' }}
                    height={{ base: '180vw', md: '150vw' }}
                    bg={`radial-gradient(
          circle,
          ${darker ? 'rgba(255,165,100,0.35)' : 'rgba(255,203,112,0.4)'} 0%,
          ${darker ? 'rgba(255,128,170,0.3)' : 'rgba(255,144,188,0.3)'} 40%,
          rgba(255,255,255,0.95) 80%
        )`}
                    filter="blur(120px)"
                    borderRadius="full"
                    zIndex={0}
                    transition="all 0.6s ease-in-out"
                    willChange="transform, opacity"
                />

                {/* Content Sections */}
                <Box position="relative" zIndex={1}>
                    <Hero />
                    <HowItWorks />

                    {/* Why VibeVerse */}
                    <Box
                        py={20}
                        px={6}
                        bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
                    >
                        <Heading textAlign="center" fontSize="3xl" color="pink.400" mb={10}>
                            Why VibeVerse?
                        </Heading>
                        <SimpleGrid columns={[1, 2, 4]} spacing={8} maxW="7xl" mx="auto">
                            {[
                                { icon: FaHeart, title: "Dual Mood Detection", text: "Upload a photo or type how you feel – we support both!" },
                                { icon: FaBrain, title: "AI-Powered Accuracy", text: "Uses DeepFace and Transformers to understand emotions better." },
                                { icon: FaMusic, title: "Smart Recommendations", text: "Get perfectly matched songs based on your detected mood." },
                                { icon: FaPalette, title: "Beautiful UI", text: "Mood-reactive design with smooth gradients and animations." },
                            ].map(({ icon, title, text }, idx) => (
                                <Box
                                    key={idx}
                                    bg="rgba(255, 255, 255, 0.05)"
                                    p={6}
                                    rounded="xl"
                                    shadow="xl"
                                    backdropFilter="blur(6px)"
                                    textAlign="center"
                                    border="1px solid rgba(255, 105, 180, 0.3)"
                                    transition="all 0.3s ease"
                                    _hover={{ transform: 'scale(1.05)', shadow: '2xl' }}
                                >
                                    <Icon as={icon} boxSize={10} color="pink.300" mb={4} />
                                    <Text fontWeight="bold" fontSize="lg" color="white">{title}</Text>
                                    <Text fontSize="sm" color="gray.200" mt={2}>{text}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* FAQ Section */}
                    <Box
                        py={20}
                        px={6}
                        bg="radial-gradient(circle at center, #1b1b1f 0%, #2a1c28 60%, #3a2936 100%)"
                    >
                        <Heading textAlign="center" fontSize="2xl" color="pink.300" mb={8}>
                            Frequently Asked Questions
                        </Heading>
                        <Box maxW="4xl" mx="auto">
                            <Accordion allowToggle>
                                {[
                                    {
                                        q: "How accurate is mood detection?",
                                        a: "Our models are trained on robust datasets and are ~90% accurate under good lighting or clear text.",
                                    },
                                    {
                                        q: "Is my photo or text stored?",
                                        a: "No, your inputs are used only for real-time detection and are not stored.",
                                    },
                                    {
                                        q: "Can I add my own songs?",
                                        a: "Yes! Use the 'Add Song' feature to upload songs with mood labels for personalization.",
                                    },
                                ].map(({ q, a }, i) => (
                                    <AccordionItem key={i}>
                                        <AccordionButton _expanded={{ bg: 'pink.400', color: 'white' }}>
                                            <Box flex="1" textAlign="left" fontWeight="medium" color="white">
                                                {q}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel pb={4} color="gray.100">
                                            {a}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </MotionBox>
    );
}