import { z } from "zod";
import { useApi } from "./useApi";
import { schema as hello_schema } from "../serverless/hello";
import { schema as world_schema } from "../serverless/world";

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
export function useWorld(params: z.infer<typeof world_schema>) {
  const parseResult = world_schema.safeParse(params);
  if (!parseResult.success) {
    throw new Error("Invalid params");
  }
  return useApi({
    key: "world",
    method: "POST",
    params,
  });
}