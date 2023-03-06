import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    ml={{ base: -2 }}
                    display={{ base: "flex", md: "none" }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                    <Text
                        textAlign={useBreakpointValue({ base: "center", md: "left" })}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                    >
                        Logo
                    </Text>

                    <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={"flex-end"}
                    direction={"row"}
                    spacing={6}
                >
                    <Button
                        as={"a"}
                        fontSize={"sm"}
                        fontWeight={400}
                        variant={"link"}
                        href={"#"}
                    >
                        Sign In
                    </Button>
                    <Button
                        as={"a"}
                        display={{ base: "none", md: "inline-flex" }}
                        fontSize={"sm"}
                        fontWeight={600}
                        color={"white"}
                        bg={"pink.400"}
                        href={"#"}
                        _hover={{
                            bg: "pink.300"
                        }}
                    >
                        Sign Up
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Text
                        as={Link}
                        p={2}
                        to={navItem.href}
                        fontSize={"sm"}
                        fontWeight={500}
                        color={linkColor}
                        _hover={{
                            textDecoration: "none",
                            color: linkHoverColor
                        }}
                    >
                        {navItem.label}
                    </Text>
                </Box>
            ))}
        </Stack>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    label={navItem.label}
                    href={navItem.href}
                />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, href }) => {
    return (
        <Stack spacing={4}>
            <Text
                fontWeight={600}
                color={useColorModeValue("gray.600", "gray.200")}
                as={Link}
                to={href}
            >
                {label}
            </Text>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: "Home",
        href: "/home"
    },
    {
        label: "Login",
        href: "/"
    },
    {
        label: "Sign Up",
        href: "/signUp"
    }
];
