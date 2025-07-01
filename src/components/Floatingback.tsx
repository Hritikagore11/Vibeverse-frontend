// src/components/FloatingBackButton.tsx
import { Button, Icon } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FloatingBackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't show on homepage
    if (location.pathname === '/') return null;

    return (
        <Button
            position="absolute"
            top="85px"  // adjust based on your Navbar height
            left="28px"
            zIndex="90"
            size="sm"
            bgGradient="linear(to-r, pink.400, pink.600)"
            color="white"
            borderRadius="xl"
            shadow="md"
            fontWeight="medium"
            leftIcon={<Icon as={ArrowBackIcon} />}
            _hover={{ bgGradient: 'linear(to-r, pink.500, pink.700)', transform: 'scale(1.05)' }}
            onClick={() => navigate(-1)}
        >
            Back
        </Button>
    );
}
