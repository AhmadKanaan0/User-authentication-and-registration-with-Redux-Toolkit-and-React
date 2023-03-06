import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    useColorModeValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupUser, signupSelector, clearState } from '../store/slices/SignUpSlice';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, errors, handleSubmit } = useForm();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        signupSelector
    );
    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            console.log(errorMessage);
            dispatch(clearState());
        }

        if (isSuccess) {
            dispatch(clearState());
            navigate('/');
        }
    }, [isError, isSuccess]);
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" {...register('firstname', { required: true })} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" {...register('lastname', { required: true })} />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    {...register('email', { pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', { required: true })}
                                    />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                {isFetching ? (
                                    <Button
                                        isLoading
                                        loadingText='Signing up'
                                        bg={"blue.400"}
                                        type="submit"
                                        w="100%"
                                        color={"white"}
                                        _hover={{
                                            bg: "blue.500"
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                ) : (
                                    <Button
                                        bg={"blue.400"}
                                        type="submit"
                                        w="100%"
                                        color={"white"}
                                        _hover={{
                                            bg: "blue.500"
                                        }}
                                    >
                                        Sign Up
                                    </Button>)}
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Signup;
