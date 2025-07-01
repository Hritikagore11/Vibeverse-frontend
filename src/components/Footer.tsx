import { Box, Text, Flex, IconButton } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    return (
        <Box
            as="footer"
            w="100%"
            py={[6, 8]}
            bg="#1b1b1f"
            borderTop="1px solid rgba(255, 255, 255, 0.08)"
            mt={0}
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="center"
                maxW="6xl"
                mx="auto"
                px={[4, 6]}
                gap={[3, 4]}
            >
                <Text
                    fontSize={['sm', 'md']}
                    color="whiteAlpha.700"
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    © {new Date().getFullYear()} VibeVerse by Hritika Gore
                </Text>

                <Text
                    fontSize={['sm', 'md']}
                    color="whiteAlpha.700"
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    Crafted with ❤️ to match your vibe
                </Text>

                <Flex gap={4}>
                    <IconButton
                        as="a"
                        href="https://github.com/Hritikagore11"
                        aria-label="GitHub"
                        icon={<FaGithub />}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        color="whiteAlpha.800"
                        _hover={{
                            color: '#f5f5f5',
                            bg: 'whiteAlpha.100',
                            transform: 'scale(1.15)',
                        }}
                        size="md"
                    />
                    <IconButton
                        as="a"
                        href="https://www.linkedin.com/in/hritikagore"
                        aria-label="LinkedIn"
                        icon={<FaLinkedin />}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        color="whiteAlpha.800"
                        _hover={{
                            color: '#0077b5',
                            bg: 'whiteAlpha.100',
                            transform: 'scale(1.15)',
                        }}
                        size="md"
                    />
                    <IconButton
                        as="a"
                        href="mailto:hritikagore@gmail.com"
                        aria-label="Email"
                        icon={<FaEnvelope />}
                        variant="ghost"
                        color="whiteAlpha.800"
                        _hover={{
                            color: '#ff6699',
                            bg: 'whiteAlpha.100',
                            transform: 'scale(1.15)',
                        }}
                        size="md"
                    />

                    <IconButton
                        as="a"
                        href="https://instagram.com/hritikagore11" // ← Replace with your real Insta
                        aria-label="Instagram"
                        icon={<FaInstagram />}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        color="whiteAlpha.800"
                        _hover={{
                            color: '#e1306c',
                            bg: 'whiteAlpha.100',
                            transform: 'scale(1.15)',
                        }}
                        size="md"
                    />
                </Flex>
            </Flex>
        </Box>
    );
}
