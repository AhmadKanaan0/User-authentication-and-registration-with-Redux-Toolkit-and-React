import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, loginSelector, clearState } from '../store/slices/LoginSlice';
import { useEffect } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    loginSelector
  );
  const onSubmit = (data) => {
    dispatch(loginUser(data));
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
      navigate('/home');
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register('email', { pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', { required: true })}
                />
              </FormControl>
              {isFetching ? (
                <Button
                  isLoading
                  loadingText='Signing in'
                  bg={"blue.400"}
                  type="submit"
                  w="100%"
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                >
                  Sign in
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
                  Sign in
                </Button>)}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
