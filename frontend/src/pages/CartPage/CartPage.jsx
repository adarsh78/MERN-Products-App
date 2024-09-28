import React, { useContext } from "react";
import "./CartPage.css";
import { CartContext } from "../../context/CartContextProvider";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, getCartTotal, clearCart, addToCart, removeFromCart } =
    useContext(CartContext);

  return (
    <>
      <div className="container">
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Button colorScheme="teal" size="sm">
            <Link to={"/"}>Shop</Link>
          </Button>
          <Button colorScheme="teal" size="sm" onClick={() => clearCart()}>
            Clear Cart
          </Button>
        </Flex>

        {cartItems.length > 0 ? (
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            my={"8"}
            textTransform={"uppercase"}
          >
            Your Cart
          </Text>
        ) : (
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            my={"8"}
            textTransform={"uppercase"}
          >
            Your cart is empty
          </Text>
        )}

        {cartItems.map((cartItem) => (
          <Box
            key={cartItem._id}
            maxW="3xl"
            borderWidth="1px"
            borderRadius="md"
            p={3}
            mb={"8"}
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Box>
                <Image
                  src={cartItem.image}
                  alt={cartItem.name}
                  h={20}
                  w={20}
                  objectFit="cover"
                  borderRadius={"10"}
                />
                <Text
                  textAlign={"center"}
                  w={20}
                  bgGradient={"linear(to-r, cyan.400, blue.500)"}
                  bgClip={"text"}
                  fontWeight={"medium"}
                  mt={1}
                >
                  {cartItem.name}
                </Text>
              </Box>

              <Text
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
                fontWeight={"medium"}
                fontSize={"20"}
              >
                ${cartItem.price}
              </Text>
              <Flex alignItems={"center"} gap={"10px"}>
                <Button
                  colorScheme="cyan"
                  size="xs"
                  fontSize={20}
                  onClick={() => removeFromCart(cartItem)}
                >
                  -
                </Button>
                <Text
                  bgGradient={"linear(to-r, cyan.400, blue.500)"}
                  bgClip={"text"}
                  fontWeight={"bold"}
                >
                  {cartItem.quantity}
                </Text>
                <Button
                  colorScheme="cyan"
                  size="xs"
                  fontSize={20}
                  onClick={() => addToCart(cartItem)}
                >
                  +
                </Button>
              </Flex>
            </Flex>
          </Box>
        ))}

        {cartItems.length > 0 && (
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"right"}
          >
            Total: ${getCartTotal().toLocaleString()}
          </Text>
        )}

        {cartItems.length > 0 && (
          <Box mx={"auto"} w={"120px"} mt={14} pb={10}>
            <Button colorScheme="teal" size="lg">
              Checkout
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default CartPage;
