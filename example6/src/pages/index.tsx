import { useHello } from "@/hooks/api";

export default function Home() {
  const { status, data, reload } = useHello({ name: "world" });

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>status: {status}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
