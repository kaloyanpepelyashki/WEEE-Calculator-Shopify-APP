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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const { shop, accessToken } = session;

  const productsService = new ProductsService(
    accessToken as string,
    shop as string,
  );
  const productList = await productsService.getAllShopProducts();

  console.log(productList);
  if (productList.length > 0) {
    return json({ accessToken, shop, productList });
  } else {
    return json({ accessToken, shop });
  }
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  console.log("accessToken, shop, productList :", loaderData);

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
