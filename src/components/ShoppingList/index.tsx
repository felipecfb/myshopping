import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    firestore()
      .collection("products")
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }) as ProductProps[];
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("my-custom-id")
  //     .get()
  //     .then((response) =>
  //       console.log({
  //         id: response.id,
  //         ...response.data(),
  //       })
  //     );
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
