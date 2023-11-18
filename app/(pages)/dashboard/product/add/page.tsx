"use client";
import React, { useState } from "react";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import FileUpload from "@/app/components/FileUpload";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface ProductCreateType {
  name: string;
  slug: string;
  productCode?: string;
  sku?: string;
  quantity: string;
  category: string;
  price: string;
}

const breadcrumbsItem = [
  { title: "Dashboard", href: "/" },
  { title: "Products", href: "/dashboard/product" },
  { title: "Add Product", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const ProductAddPage = () => {
  const [image, setImage] = useState({ url: "", name: "" });
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      slug: "",
      productCode: "",
      sku: "",
      quantity: "",
      category: "",
      price: "",
      description: "",
    },

    validate: {
      name: (val) => (!val ? "name is required" : null),
      slug: (val) => (!val ? "slug is required" : null),
      quantity: (val) => (!val ? "quantity is required" : null),
      category: (val) => (!val ? "category is required" : null),
      price: (val) => (!val ? "price is required" : null),
      description: (val) => (!val ? "price is required" : null),
    },
  });

  const submitHandler = async (values: ProductCreateType) => {
    try {
      const { data } = await axios.post("/api/product/add", {
        ...values,
        image: image.url,
      });

      notifications.show({
        title: "Product creation",
        message: data.msg,
        color: "green",
      });
      form.reset();
      router.push("/dashboard/product");
    } catch (err: any) {
      notifications.show({
        title: "Product Create Error",
        message: err.response.data.msg || err.message,
        color: "red",
      });
    }
  };

  return (
    <Container p="xl" size="xl" mt={20}>
      <Text mb={20} variant="text" size="xl" fw={900}>
        Add a product
      </Text>
      <Breadcrumbs separator="→" mt="xs" mb={20}>
        {breadcrumbsItem}
      </Breadcrumbs>

      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
        <Grid mt={10}>
          <Grid.Col span={4}>
            <Text size="xl" fw={600}>
              Details
            </Text>
            <Text c="dimmed">Name, description, image...</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            <TextInput
              size="md"
              required
              label="Product Name"
              placeholder="Your product name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
              mb={12}
            />

            <TextInput
              size="md"
              required
              label="Slug"
              placeholder="Slug will automatically generate"
              value={form.values.slug}
              onChange={(event) =>
                form.setFieldValue("slug", event.currentTarget.value)
              }
              radius="md"
              mb={12}
            />

            <Textarea
              required
              size="md"
              radius="md"
              label="Product Description"
              withAsterisk
              placeholder="Your product description"
              mb={12}
              autosize
              minRows={12}
              value={form.values.description}
              onChange={(event) =>
                form.setFieldValue("description", event.currentTarget.value)
              }
            />

            <Text size="md" mt={12} fw={500}>
              Product Image Upload
            </Text>
            <FileUpload setImage={setImage} />
          </Grid.Col>
          {/* NOTE: Properties */}
          <Grid.Col span={4} mt={20}>
            <Text size="xl" fw={600}>
              Properties
            </Text>
            <Text c="dimmed">Additional functions and attributes...</Text>
          </Grid.Col>
          <Grid.Col span={7} mt={20}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  size="md"
                  label="Product Code"
                  placeholder="Your product code"
                  value={form.values.productCode}
                  onChange={(event) =>
                    form.setFieldValue("productCode", event.currentTarget.value)
                  }
                  radius="md"
                  mb={12}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  size="md"
                  label="Product SKU"
                  placeholder="You product sku"
                  value={form.values.sku}
                  onChange={(event) =>
                    form.setFieldValue("sku", event.currentTarget.value)
                  }
                  radius="md"
                  mb={12}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  required
                  size="md"
                  label="Quantity"
                  placeholder="You product quantity"
                  value={form.values.quantity}
                  onChange={(event) =>
                    form.setFieldValue("quantity", event.currentTarget.value)
                  }
                  radius="md"
                  mb={12}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  size="md"
                  required
                  label="Category"
                  placeholder="You product category"
                  value={form.values.category}
                  onChange={(event) =>
                    form.setFieldValue("category", event.currentTarget.value)
                  }
                  radius="md"
                  mb={12}
                />
              </Grid.Col>
            </Grid>
            <TextInput
              required
              size="md"
              label="Price"
              placeholder="You product price"
              value={form.values.price}
              onChange={(event) =>
                form.setFieldValue("price", event.currentTarget.value)
              }
              radius="md"
              mb={12}
            />
            <Button type="submit">Submit</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductAddPage;
