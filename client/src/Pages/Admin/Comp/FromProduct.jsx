import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";

const FormProduct = (props) => {
  const { product, categories, type, handleEditProduct, handleCreateProduct } =
    props;
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [price, setPrice] = useState("");
  console.log("check product form: ", product);

  useEffect(() => {
    if (type !== "Create") {
      setProductName(product.productName);
      setQuantity(product.quantity);
      setPrice(product.price);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setImageUrl(product.imageUrl);
    }
  }, [type, product]);

  const handleOnClickSubmit = () => {
    if (type === "Create") {
      const data = {
        categoryId: categoryId,
        productName: productName,
        quantity: quantity,
        price: price,
        description: description,
        imageUrl: imageUrl,
      };
      handleCreateProduct(data);
    } else {
      const data = {
        id: product.id,
        newProductName: productName,
        productName: product.productName,
        categoryId: categoryId,
        quantity: quantity,
        price: price,
        description: description,
        imageUrl: imageUrl,
      };
      handleEditProduct(data);
    }
  };

  //   console.log("check data in form: ", user);
  return (
    <form>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Product name</FormLabel>
          <Input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="Enter product name"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="text"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="Enter quantity"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Enter price"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter description"
            disabled={type === "Detail"}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category Name</FormLabel>
          <Select
            name="categoryName"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value={""}>---Category name---</option>
            {categories.map((value) => (
              <option key={value.id} value={value.id}>
                {value.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            type="file"
            onChange={(event) => setImageUrl(event.target.files[0])}
            disabled={type === "Detail"}
          />
        </FormControl>

        {type !== "Detail" && (
          <Button colorScheme="teal" onClick={handleOnClickSubmit}>
            Submit
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default FormProduct;
