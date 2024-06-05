import { z } from "zod";
import { schema as hello_schema } from "../serverless/hello";
import { useState, useEffect } from "react";

export function useHello(params: z.infer<typeof hello_schema>) {
  const parseResult = hello_schema.safeParse(params);
  if (!parseResult.success) {
    throw new Error("Invalid params");
  }
  return useApi({
    key: "hello",
    method: "GET",
    params,
  });
}

export default function useApi({
  key,
  method,
  params,
}: {
  key: string;
  method: string;
  params: Record<string, any>;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [data, setData] = useState();

  const load = async () => {
    setStatus("loading");
    let url = `/api/gen/${key}`;
    if (method === "GET") {
      url += `?${getQueryParams(params)}`;
    }
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "GET" ? undefined : JSON.stringify(params),
      });
      setData(await response.json());
    } catch (err) {
      setStatus("error");
      throw err;
    }
    setStatus("success");
  };

  useEffect(() => {
    load();
  }, []);

  return { status, data, reload: load };
}

function getQueryParams(params: Record<string, any>) {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}
