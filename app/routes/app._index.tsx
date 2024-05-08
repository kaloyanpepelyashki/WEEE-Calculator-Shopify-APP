import { LoaderArgs, json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, BlockStack, Card } from "@shopify/polaris";
import WeeeCalculatorAccessor from "../Services/WeeeCalculatorAccessor";
import WeeeCollectionsService from "../Services/WeeeCollectionsService";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { useAppBridge } from "@shopify/app-bridge-react";
import { EmbeddedAdminContext } from "node_modules/@shopify/shopify-app-remix/build/ts/server/authenticate/admin/types";
import ProductsService from "../Services/ProductsService";

//Every page should have exaclty one loader function, the loader function is where data is being fetched
export const loader = async ({ request }: LoaderFunctionArgs) => {
  //First you authenticated the session
  const { session } = await authenticate.admin(request);

  //Fromm session you can extract:
  // "shop" - shopify host name
  // "accessToken" - the shopify api key
  const { shop, accessToken } = session;

  //This is the product service
  const productsService: ProductsService = new ProductsService(
    accessToken as string,
    shop as string,
  );

  //This will get a list of shop products
  const productList = await productsService.getAllShopProducts();

  console.log(productList);
  if (productList.length > 0) {
    return json({ accessToken, shop, productList });
  }
};

export default function Index() {
  //You extract data from the loader using useLoaderData
  const loaderData = useLoaderData<typeof loader>();

  console.log("accessToken, shop, productList :", loaderData.productList);

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>Hello World!</Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
