import {
    Box,
    Text,
    VStack,
    Heading,
    IconButton,
    Flex,
    Button,
    Image,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Tooltip,
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type Song = { title: string; filePath: string; artist?: string };

export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location as { state: { mood?: string; image?: string } };
    const mood = state?.mood || "Unknown";
    const imageUrl = state?.image || null;

    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hoveredTime, setHoveredTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (mood && mood !== "Unknown") {
            fetch(`${import.meta.env.VITE_API_URL}/songs/${mood.toLowerCase()}`)
                .then((res) => res.json())
                .then((data) => setSongs(data.songs || []))
                .catch((err) => console.error("Failed to fetch songs:", err));
        }
    }, [mood]);

    const handlePlay = (song: Song, index: number) => {
        if (currentSong?.filePath === song.filePath) {
            audioRef.current?.pause();
            setIsPlaying(false);
            setCurrentSong(null);
            setCurrentIndex(null);
        } else {
            setCurrentSong(song);
            setCurrentIndex(index);
            setTimeout(() => {
                audioRef.current?.play();
                setIsPlaying(true);
            }, 100);
        }
    };

    const playNext = () => {
        if (currentIndex !== null && currentIndex < songs.length - 1) {
            const next = currentIndex + 1;
            setCurrentSong(songs[next]);
            setCurrentIndex(next);
            setTimeout(() => {
                audioRef.current?.play();
                setIsPlaying(true);
            }, 100);
        }
    };

    const playPrev = () => {
        if (currentIndex !== null && currentIndex > 0) {
            const prev = currentIndex - 1;
            setCurrentSong(songs[prev]);
            setCurrentIndex(prev);
            setTimeout(() => {
                audioRef.current?.play();
                setIsPlaying(true);
            }, 100);
        }
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60)
            .toString()
            .padStart(2, "0");
        const secs = Math.floor(time % 60)
            .toString()
            .padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <Box
            minH="100vh"
            bg="radial-gradient(circle at center, #3a2936 0%, #2a1c28 40%, #1b1b1f 100%)"
            pt="120px"
            px={6}
            pb={36}
            color="whiteAlpha.900"
            fontFamily="'Poppins', sans-serif"
        >
            <Box maxW="5xl" mx="auto" mb={8}>
                <Heading size="lg" mb={2} mt={6}>
                    Detected Mood:
                </Heading>
                <Text fontSize="2xl" fontWeight="bold" color="#ff6699">
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </Text>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        borderRadius="lg"
                        mt={6}
                        maxH="240px"
                        objectFit="cover"
                        boxShadow="lg"
                    />
                )}
            </Box>

            <Box maxW="5xl" mx="auto">
                <Heading size="md" mb={4} color="whiteAlpha.800">
                    Recommended Songs
                </Heading>

                {songs.length > 0 ? (
                    <VStack spacing={3} align="stretch">
                        {songs.map((song, idx) => (
                            <Flex
                                key={idx}
                                align="center"
                                justify="space-between"
                                bg={
                                    currentSong?.filePath === song.filePath
                                        ? "#5a1a3d"
                                        : "#2e1d29"
                                }
                                _hover={{ bg: "#3b2533" }}
                                borderRadius="lg"
                                p={4}
                                transition="background 0.2s ease"
                            >
                                <Box>
                                    <Text fontWeight="semibold" fontSize="md">
                                        {song.title}
                                    </Text>
                                    <Text fontSize="sm" color="whiteAlpha.600">
                                        {song.artist || "Unknown Artist"}
                                    </Text>
                                </Box>
                                <IconButton
                                    icon={
                                        currentSong?.filePath === song.filePath && isPlaying ? (
                                            <FaPause />
                                        ) : (
                                            <FaPlay />
                                        )
                                    }
                                    aria-label="Play/Pause"
                                    bg="#ff6699"
                                    color="black"
                                    _hover={{ bg: "#ff4f87" }}
                                    borderRadius="md"
                                    boxSize="40px"
                                    fontSize="16px"
                                    onClick={() => handlePlay(song, idx)}
                                />
                            </Flex>
                        ))}
                    </VStack>
                ) : (
                    <Text>No songs found for this mood.</Text>
                )}

                <Box textAlign="center" mt={10}>
                    <Text fontSize="md" color="gray.500" mb={2}>
                        Don’t see your favorite song for this mood?
                    </Text>
                    <Button variant="outline" colorScheme="pink" onClick={() => navigate('/add-song')}>
                        Add a Song
                    </Button>
                </Box>

                <Text
                    mt={8}
                    textDecor="underline"
                    cursor="pointer"
                    onClick={() => navigate("/select-mode")}
                >
                    ← Detect another mood
                </Text>
            </Box>

            {currentSong && (
                <Box
                    position="fixed"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="#1b1b1f"
                    px={6}
                    py={4}
                    borderTop="1px solid rgba(255, 255, 255, 0.05)"
                    boxShadow="0 -2px 10px rgba(0, 0, 0, 0.6)"
                    zIndex={1000}
                >
                    <Flex justify="space-between" align="center" flexWrap="wrap">
                        <Flex align="center" gap={3}>
                            <Box>
                                <Text fontWeight="bold" fontSize="md">
                                    Now Playing
                                </Text>
                                <Text fontSize="md" color="#ff6699">
                                    {currentSong.title}
                                </Text>
                            </Box>

                            {/* Waveform */}
                            <Flex gap={1} ml={4} align="flex-end" height="18px">
                                {[1, 2, 3, 4, 5].map((bar) => (
                                    <Box
                                        key={bar}
                                        w="5px"
                                        h="20px"
                                        bg="#ff4f87"
                                        borderRadius="full"
                                        animation={
                                            isPlaying
                                                ? `waveAnim 1s ease-in-out infinite ${bar * 0.1}s`
                                                : "none"
                                        }
                                    />
                                ))}
                            </Flex>
                        </Flex>

                        {/* Controls */}
                        <Flex align="center" gap={3}>
                            <IconButton
                                icon={<FaBackward />}
                                onClick={playPrev}
                                aria-label="Prev"
                                bg="#ff6699"
                                color="black"
                                _hover={{ bg: "#ff4f87" }}
                            />
                            <IconButton
                                icon={isPlaying ? <FaPause /> : <FaPlay />}
                                onClick={() => {
                                    if (isPlaying) {
                                        audioRef.current?.pause();
                                        setIsPlaying(false);
                                    } else {
                                        audioRef.current?.play();
                                        setIsPlaying(true);
                                    }
                                }}
                                aria-label="Play/Pause"
                                bg="#ff6699"
                                color="black"
                                _hover={{ bg: "#ff4f87" }}
                            />
                            <IconButton
                                icon={<FaForward />}
                                onClick={playNext}
                                aria-label="Next"
                                bg="#ff6699"
                                color="black"
                                _hover={{ bg: "#ff4f87" }}
                            />
                        </Flex>
                    </Flex>

                    {/* Audio player with slider */}
                    <Box mt={4}>
                        <audio
                            ref={audioRef}
                            src={`${import.meta.env.VITE_API_URL}${currentSong.filePath}`}
                            onEnded={playNext}
                            autoPlay
                            onTimeUpdate={() => {
                                const current = audioRef.current?.currentTime || 0;
                                const dur = audioRef.current?.duration || 0;
                                setProgress(current);
                                setDuration(dur);
                            }}
                        />
                        <Slider
                            aria-label="progress"
                            value={progress}
                            min={0}
                            max={duration || 1}
                            step={0.1}
                            onChange={(val) => {
                                setProgress(val);
                                if (audioRef.current) audioRef.current.currentTime = val;
                            }}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onMouseMove={(e) => {
                                const rect = (e.target as HTMLElement).getBoundingClientRect();
                                const relX = e.clientX - rect.left;
                                const percent = relX / rect.width;
                                setHoveredTime(percent * (duration || 1));
                            }}
                            mt={2}
                            colorScheme="pink"
                        >
                            <SliderTrack bg="whiteAlpha.300">
                                <SliderFilledTrack bg="#ff4f87" />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg="#ff4f87"
                                color="black"
                                placement="top"
                                isOpen={showTooltip}
                                label={formatTime(hoveredTime)}
                            >
                                <SliderThumb boxSize={4} />
                            </Tooltip>
                        </Slider>
                    </Box>

                    <style>{`
            @keyframes waveAnim {
              0%, 100% { transform: scaleY(0.5); }
              50% { transform: scaleY(1.5); }
            }
          `}</style>
                </Box>
            )}
        </Box>
    );
}
