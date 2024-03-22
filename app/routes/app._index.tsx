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
import WeeeCollectionsService from "../Services/WeeeCollectionsManager";

export default function Index() {
  const [data, setData] = useState([0]);
  const dpaCalcualtor = new WeeeCalculatorAccessor();
  const collectionsManager = WeeeCollectionsService.getInstance();

  const outputData = async () => {
    setData(await dpaCalcualtor.fetchData());
  };

  const testPost = async () => {
    await collectionsManager.createColletions(["1231212", "434444"]);
  };

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <button onClick={outputData}>Fetch</button>
            <h2>
              {data.map((entry: number) => {
                return <h2 key={entry}>{entry}</h2>;
              })}
            </h2>
            <button onClick={testPost}>test test</button>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
