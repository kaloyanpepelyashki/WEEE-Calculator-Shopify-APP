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

export default function Index() {
  const [data, setData] = useState([0]);
  const dpaCalcualtor = new WeeeCalculatorAccessor();

  const outputData = async () => {
    setData(await dpaCalcualtor.fetchData());
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
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
