import {
    Box,
    Button,
    Heading,
    VStack,
    Input,
    Image,
    HStack,
    useToast,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

export default function ImageDetection() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [showWebcam, setShowWebcam] = useState(false);
    const webcamRef = useRef<Webcam>(null);
    const navigate = useNavigate();
    const toast = useToast();

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCapture = () => {
        const screenshot = webcamRef.current?.getScreenshot();
        if (screenshot) {
            setSelectedImage(screenshot);
            setShowWebcam(false);
        }
    };

    const handleDetect = async () => {
        if (!selectedImage) {
            toast({
                title: 'No image selected.',
                description: 'Please upload or capture an image first.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsDetecting(true);

        try {
            const blob = await (await fetch(selectedImage)).blob();
            const formData = new FormData();
            formData.append("image", blob, "image.jpg");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/detect-image`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Detection failed");

            const data = await response.json();
            const detectedMood = data.mood;

            navigate("/result", { state: { mood: detectedMood, image: selectedImage } });

        } catch (error) {
            console.error("❌ Detection error:", error);
            toast({
                title: "Error",
                description: "Failed to detect emotion.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDetecting(false);
        }
    };

    const reset = () => {
        setSelectedImage(null);
        setShowWebcam(false);
    };

    return (
        <Box
            minH="100vh"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={6}
            py={12}
        >
            <Box
                bg="#2d1c27"
                borderRadius="2xl"
                p={10}
                maxW="lg"
                w="100%"
                boxShadow="lg"
                textAlign="center"
                color="white"
            >
                <Heading fontSize="2xl" mb={4} color="#ff6699">
                    Detect Emotion from Your Face
                </Heading>

                {/* Camera + Upload Buttons (Responsive) */}
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}
                    justifyContent="center"
                    alignItems={{ base: 'flex-start', md: 'center' }}
                    gap={4}
                    mb={4}
                    w="full"
                >
                    <Button
                        colorScheme="pink"
                        variant="solid"
                        onClick={() => setShowWebcam(true)}
                        w={{ base: '100%', md: 'auto' }}
                    >
                        Click Photo
                    </Button>

                    <Box w={{ base: '100%', md: 'auto' }}>
                        <Input
                            type="file"
                            accept="image/*"
                            display="none"
                            id="file-upload"
                            onChange={handleUpload}
                        />
                        <label htmlFor="file-upload" style={{ width: '100%' }}>
                            <Button
                                as="span"
                                variant="outline"
                                colorScheme="pink"
                                w={{ base: '100%', md: 'auto' }}
                            >
                                Upload Image
                            </Button>
                        </label>
                    </Box>
                </Box>

                {showWebcam && (
                    <Box mb={4}>
                        <Webcam
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: 'user' }}
                            style={{ borderRadius: '0.75rem' }}
                        />
                        <Button
                            mt={2}
                            size="sm"
                            onClick={handleCapture}
                            colorScheme="pink"
                            w="full"
                        >
                            Capture Photo
                        </Button>
                    </Box>
                )}

                {selectedImage && !showWebcam && (
                    <VStack spacing={3} mt={4}>
                        <Image
                            src={selectedImage}
                            alt="Selected"
                            borderRadius="lg"
                            boxShadow="md"
                            maxH="250px"
                            objectFit="cover"
                        />
                        <HStack spacing={3}>
                            <Button
                                colorScheme="pink"
                                onClick={handleDetect}
                                isLoading={isDetecting}
                            >
                                Detect Emotion
                            </Button>
                            <Button
                                colorScheme="pink"
                                variant="outline"
                                onClick={() => setShowWebcam(true)}
                            >
                                Retake Photo
                            </Button>
                        </HStack>
                    </VStack>
                )}

                <VStack spacing={3} mt={6}>
                    <Button
                        onClick={reset}
                        variant="outline"
                        colorScheme="whiteAlpha.600"
                        size="sm"
                    >
                        Try Another
                    </Button>
                    <Button
                        size="sm"
                        variant="link"
                        colorScheme="pink"
                        onClick={() => navigate('/select-mode')}
                    >
                        ← Back to Mode Selection
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
