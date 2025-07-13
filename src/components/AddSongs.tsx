import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
    useToast,
    VStack,
    Text,
    Icon,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

export default function AddSong() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [mood, setMood] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();

    const handleSubmit = async () => {
        if (!title || !artist || !mood || !file) {
            toast({
                title: 'All fields are required',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('mood', mood);
        formData.append('file', file);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/add-song`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast({
                title: 'Song Added',
                description: 'Song uploaded successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            setTitle('');
            setArtist('');
            setMood('');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            toast({
                title: 'Upload failed',
                description: 'Something went wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box
            minH="100vh"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            pt={{ base: '120px', md: '100px' }}
            pb={16}
            px={{ base: 4, md: 6 }}
            fontFamily="'Poppins', sans-serif"
        >
            <Box
                maxW="500px"
                mx="auto"
                mt={10}
                p={6}
                boxShadow="0 8px 20px rgba(0, 0, 0, 0.4)"
                borderRadius="2xl"
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
            >
                <Heading size="lg" mb={6} textAlign="center" color="white">
                    Add a New Song
                </Heading>

                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel color="white">Title</FormLabel>
                        <Input
                            placeholder="Song Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            bg="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.300' }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="white">Artist</FormLabel>
                        <Input
                            placeholder="Artist Name"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            bg="whiteAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.300' }}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="white">Mood</FormLabel>
                        <Select
                            placeholder="Select mood"
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            bg="blackAlpha.100"
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                            _hover={{ bg: 'blackAlpha.600' }}
                            _focus={{ bg: 'blackAlpha.600' }}
                        >
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Happy">Happy</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Sad">Sad</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Angry">Angry</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Calm">Calm</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Disgust">Disgust</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Fear">Fear</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Surprise">Surprise</option>
                            <option style={{ backgroundColor: '#1A202C', color: 'white' }} value="Neutral">Neutral</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color="white">Audio File</FormLabel>

                        <Button
                            leftIcon={<Icon as={FiUpload} />}
                            colorScheme="pink"
                            variant="solid"
                            onClick={handleFileClick}
                            borderRadius="full"
                            size="md"
                            _hover={{ bg: 'pink.500' }}
                        >
                            Choose File
                        </Button>

                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="audio/*"
                            display="none"
                            onChange={(e) => {
                                const fileList = e.target.files;
                                if (fileList && fileList[0]) setFile(fileList[0]);
                            }}
                        />

                        {file && (
                            <Text mt={2} fontSize="sm" color="gray.300">
                                Selected: {file.name}
                            </Text>
                        )}
                    </FormControl>

                    <Button
                        bg="pink.400"
                        color="white"
                        width="full"
                        _hover={{ bg: 'pink.500' }}
                        _active={{ bg: 'purple.600' }}
                        borderRadius="xl"
                        fontWeight="semibold"
                        boxShadow="0 0 12px rgba(255, 192, 203, 0.4)"
                        transition="all 0.3s ease"
                        onClick={handleSubmit}
                    >
                        Upload Song
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
