// src/pages/TextDetection.tsx
import {
    Box,
    Button as ChakraButton,
    Heading,
    Textarea,
    VStack,
    useToast,
    Spinner,
    Text,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const questions = [
    "How are you feeling right now?",
    "What was the highlight of your day?",
    "Is there anything bothering you today?",
    "What’s your current energy level like?",
    "What kind of music are you in the mood for?",
];

const MotionButton = motion(ChakraButton);

export default function TextDetection() {
    const [responses, setResponses] = useState<string[]>(Array(5).fill(''));
    const [isDetecting, setIsDetecting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const filledCount = responses.filter((r) => r.trim() !== '').length;

    const handleSubmit = async () => {
        const finalText = responses.join(' ');
        setIsDetecting(true);

        try {
            const res = await fetch("http://127.0.0.1:5000/detect-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: finalText }),
            });

            const data = await res.json();

            if (data.mood) {
                navigate("/result", { state: { mood: data.mood } });
            } else {
                throw new Error("No mood received");
            }
        } catch (error) {
            toast({
                title: "Detection failed",
                description: "Try again later.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDetecting(false);
        }
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            px={{ base: 4, md: 6 }}
            py={{ base: 10, md: 12 }}
            pt={{ base: "140px", md: "80px" }}
            fontFamily="'Poppins', sans-serif"
        >
            <Box
                bg="#2d1c27"
                p={{ base: 6, md: 10 }}
                borderRadius="2xl"
                boxShadow="lg"
                maxW={{ base: "100%", sm: "90%", md: "720px" }}
                w="100%"
                color="white"
            >
                <Heading fontSize="2xl" mb={8} color="#ff6699" textAlign="center">
                    Let's Understand Your Mood
                </Heading>

                <VStack spacing={6} align="stretch">
                    {questions.map((q, index) => (
                        <FormControl key={index}>
                            <FormLabel fontWeight="semibold" color="whiteAlpha.900">{q}</FormLabel>
                            <Textarea
                                placeholder="Your response..."
                                value={responses[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                bg="#3b2533"
                                borderColor="whiteAlpha.300"
                                _placeholder={{ color: "whiteAlpha.500" }}
                                _focus={{ borderColor: "#ff6699", boxShadow: "0 0 0 1px #ff6699" }}
                                color="white"
                            />
                        </FormControl>
                    ))}
                </VStack>

                {filledCount < 3 && (
                    <Text color="red.300" fontSize="sm" mt={4} textAlign="center">
                        Please answer at least 3 questions to detect your mood.
                    </Text>
                )}

                {isDetecting ? (
                    <VStack mt={8} spacing={2}>
                        <Spinner color="#ff6699" />
                        <Text fontSize="sm" color="whiteAlpha.700">
                            Analyzing your responses...
                        </Text>
                    </VStack>
                ) : (
                    <MotionButton
                        mt={{ base: 8, md: 10 }}
                        bgGradient="linear(to-r, #ff69a7, #ff4c91)"
                        _hover={{ bgGradient: "linear(to-r, #ff85b3, #ff649c)" }}
                        color="white"
                        size="lg"
                        w="full"
                        onClick={handleSubmit}
                        isDisabled={filledCount < 3}
                        animate={{
                            scale: filledCount >= 3 ? 1 : 0.95,
                            opacity: filledCount >= 3 ? 1 : 0.6,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                    >
                        Detect Mood
                    </MotionButton>
                )}
            </Box>
        </Box>
    );
}
