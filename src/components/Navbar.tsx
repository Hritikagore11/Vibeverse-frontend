// src/components/Navbar.tsx
import {
    Box,
    Flex,
    Image,
    Button,
    Text,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.png';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Detect Mood', path: '/select-mode' },
        { name: 'Add Song', path: '/add-song' },
        { name: 'My Vibes', path: '/my-vibes' },
        { name: 'About', path: '/about' },
    ];

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="100"
            bg="rgba(10, 30, 30, 0.5)"
            backdropFilter="blur(16px)"
            px={6}
            py={3}
            boxShadow="md"
            borderBottom="1px solid rgba(255, 255, 255, 0.08)"
            sx={{ WebkitBackdropFilter: 'blur(16px)' }}
        >
            <Flex align="center" justify="space-between">
                {/* Left: Logo + Brand + Nav Buttons */}
                <Flex align="center" gap={6}>
                    <Image
                        src={logo}
                        alt="VibeVerse Icon"
                        boxSize="45px"
                        borderRadius="full"
                        shadow="lg"
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="all 0.2s"
                        cursor="pointer"
                        onClick={() => navigate('/')}
                    />
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        bgGradient="linear(to-r, pink.400, purple.400)"
                        bgClip="text"
                        cursor="pointer"
                        onClick={() => navigate('/')}
                    >
                        VibeVerse
                    </Text>

                    {/* Desktop Nav */}
                    <Flex gap={4} display={['none', 'none', 'flex']}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                variant="ghost"
                                color={location.pathname === item.path ? 'pink.300' : 'white'}
                                fontWeight="medium"
                                size="lg"
                                _hover={{
                                    color: 'pink.300',
                                    transform: 'scale(1.05)',
                                }}
                                onClick={() => navigate(item.path)}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Flex>
                </Flex>

                {/* Mobile Hamburger */}
                <IconButton
                    aria-label="Open Menu"
                    icon={<HamburgerIcon />}
                    display={['flex', 'flex', 'none']}
                    onClick={onOpen}
                    color="white"
                    variant="ghost"
                    _hover={{ bg: 'pink.400', color: 'black' }}
                />
            </Flex>

            {/* Mobile Drawer */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="#1a1a1d" color="white">
                    <DrawerCloseButton />
                    <DrawerBody mt={10}>
                        <Stack spacing={4}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    color={location.pathname === item.path ? 'pink.300' : 'white'}
                                    fontWeight="medium"
                                    size="lg"
                                    _hover={{
                                        color: 'pink.300',
                                        transform: 'scale(1.05)',
                                    }}
                                    onClick={() => {
                                        navigate(item.path);
                                        onClose();
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
