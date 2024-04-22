"use client";
import { useGetRecipientsList } from "@/hooks/recipients";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export const runtime = "edge"; // 'nodejs' (default) | 'edge'

function getBaseURL() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // return "https://rolling-api.vercel.app/2-3/recipients";
  return "http://localhost:3000";
}
const baseUrl = getBaseURL();
function useWaitQuery(props) {
  const query = useSuspenseQuery({
    queryKey: ["wait", props.wait],
    queryFn: async () => {
      const path = `/api/wait?wait=${props.wait}`;
      // const path = `https://rolling-api.vercel.app/2-3/recipients/`;
      // const path = `https://rolling-api.vercel.app/2-3/recipients/api/wait?wait=${props.wait}`;
      // const url = `https://rolling-api.vercel.app/2-3/recipients/`;
      const url = baseUrl + path;

      const res = await (
        await fetch("https://rolling-api.vercel.app/2-3/recipients/", {
          cache: "no-store",
        })
      ).json();
      return res;
    },
  });

  return [query.data, query];
}

function MyComponent(props) {
  const [data] = useWaitQuery(props);
  // console.log(data);

  return <div>result:</div>;
}

export default function MyPage() {
  // const { data } = useGetRecipientsList();
  // console.log(data)

  return (
    <>
      <Suspense fallback={<div>waiting 100....</div>}>
        <MyComponent wait={100} />
      </Suspense>
      {/* <Suspense fallback={<div>waiting 200....</div>}>
        <MyComponent wait={200} />
      </Suspense>
      <Suspense fallback={<div>waiting 300....</div>}>
        <MyComponent wait={300} />
      </Suspense>
      <Suspense fallback={<div>waiting 400....</div>}>
        <MyComponent wait={400} />
      </Suspense>
      <Suspense fallback={<div>waiting 500....</div>}>
        <MyComponent wait={500} />
      </Suspense>
      <Suspense fallback={<div>waiting 600....</div>}>
        <MyComponent wait={600} />
      </Suspense>
      <Suspense fallback={<div>waiting 700....</div>}>
        <MyComponent wait={700} />
      </Suspense>

      <fieldset>
        <legend>
          combined <code>Suspense</code>-container
        </legend>
        <Suspense
          fallback={
            <>
              <div>waiting 800....</div>
              <div>waiting 900....</div>
              <div>waiting 1000....</div>
            </>
          }
        >
          <MyComponent wait={800} />
          <MyComponent wait={900} />
          <MyComponent wait={1000} />
        </Suspense>
      </fieldset> */}
    </>
  );
}

// import { Suspense } from "react";
// // import { PostFeed, Weather } from "./Components";

// export default function Posts() {
//   return (
//     <section>
//       <Suspense fallback={<p>Loading feed...</p>}>
//         <div>메롱</div>
//       </Suspense>
//       <Suspense fallback={<p>Loading weather...</p>}>
//       <div>메롱2</div>
//       </Suspense>
//     </section>
//   );
// }
