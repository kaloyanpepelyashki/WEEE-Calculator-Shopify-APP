import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import WeeeCalculatorAccessor from "../Services/WeeeCalculatorAccessor";
import WeeeCollectionsService from "../Services/WeeeCollectionsService";
import ProductsService from "~/Services/PropductsService";

export default function Index() {
  const [data, setData] = useState({});
  const [products, setProducts] = useState();
  const WeeeCalcualtor = new WeeeCalculatorAccessor();
  const collectionsManager = WeeeCollectionsService.getInstance();
  const productService = ProductsService.getInstance();

  const outputData = async () => {
    setData(
      await WeeeCalcualtor.fetchData([
        "WEEE Light sources",
        "WEEE Small IT and telecommunication equipment",
        "WEEE Portable batteries",
        "WEEE Large equipment bigger than 50cm",
        "WEEE Small equipment smaller than 50cm",
        "WEEE Temperature exchange equipment",
        "WEEE Photovoltaic panels",
      ]),
    );
  };

  const testPost = async () => {
    await collectionsManager.createColletions(["1231212", "434444"]);
  };

  // const getProducts = async () => {
  //   const response = await productService.getAllShopProducts();

  //   if (response) {
  //     setProducts(response);
  //   }
  // };

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <button onClick={outputData}>Fetch</button>
            <h2>
              {Object.entries(data).map(([key, value]) => {
                return (
                  <p>
                    {key} : <b>{value.toString()}</b>
                  </p>
                );
              })}
            </h2>
            <button onClick={testPost}>test test</button>
            {/* {products.map((product) => {
              return (
                <Card key={product.productId}>
                  <h1>{product.title}</h1>
                </Card>
              );
            })} */}
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
