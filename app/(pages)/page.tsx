"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Text } from "@mantine/core";
import { allProducts } from "@/lib/product";
import { Product } from "@prisma/client";
import ProductCard from "../components/ProductCard";
import { useSelector } from "@/redux/store";
import { selectCart } from "@/redux/slices/cartSlice";

export default function HomePage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const selector = useSelector(selectCart);

  console.log(selector);

  useEffect(() => {
    allProducts().then((data) => setProducts(data.products));
  }, []);

  return (
    <Container size="xl">
      <Text fw={900} mt={30} mb={15} size="xl">
        🔥 Trending
      </Text>
      <Grid>
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <Grid.Col span={3} key={product.id}>
              <ProductCard
                category={product.category}
                id={product.id}
                name={product.name}
                image={product.image}
              />
            </Grid.Col>
          ))}
      </Grid>
      <Text fw={900} mt={30} mb={15} size="xl">
        🔥 Top Rated Shops
      </Text>
      <Grid>
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <Grid.Col span={3} key={product.id}>
              <ProductCard
                category={product.category}
                id={product.id}
                name={product.name}
                image={product.image}
              />
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}
