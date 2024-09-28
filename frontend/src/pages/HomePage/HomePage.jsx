import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import "./HomePage.css"
import { CartContext } from "../../context/CartContextProvider";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [visiblePageNumbers, setVisiblePageNumbers] = useState([
    1, 2, 3, 4, 5
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageClick = (selectedPage) => {
      setCurrentPage(selectedPage);

  }

  const handlePrevClick = (selectedPage) => {
    console.log(selectedPage);
    if(currentPage > 1) {
        setCurrentPage(selectedPage);
      }
      if (visiblePageNumbers[0] > 1) {
        setVisiblePageNumbers(visiblePageNumbers.map((vis) => vis - 1));
      }
  }

  const handleNextClick = (selectedPage) => {
    console.log(selectedPage);
    if(currentPage <= products.length / 5) {
        setCurrentPage(selectedPage);
      }
    if(visiblePageNumbers[visiblePageNumbers.length - 1] < products.length / 5) {
      setVisiblePageNumbers(visiblePageNumbers.map((vis) => vis + 1));
    }
  }

  const { cartItems } = useContext(CartContext);


  console.log("products: ", products);
  return (
    <>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          <Flex>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Current Products 🚀
          </Text>
          <Text
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            <Link to={"/cart"}>
           Cart: {cartItems.length}
            </Link>
          </Text>
          </Flex>

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products
              .slice(currentPage * 6 - 6, currentPage * 6)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </SimpleGrid>

          {products.length === 0 && (
            <Text
              fontSize="xl"
              textAlign={"center"}
              fontWeight="bold"
              color="gray.500"
            >
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a product
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>

      <div className="division">
       <span onClick={() => handlePrevClick(currentPage - 1)} className={currentPage > 1 ? "" : "pagination-disabled"}>Prev</span>
       {visiblePageNumbers.map((vis) => (
        <span key={vis} className={currentPage === vis ? "pagination-selected" : ""} onClick={() => handlePageClick(vis)}>{vis}</span>
       ))}
       <span onClick={() => handleNextClick(currentPage + 1)} className={currentPage < products.length / 5 ? "" : "pagination-disabled"}>Next</span>
      </div>
    </>
  );
};

export default HomePage;
