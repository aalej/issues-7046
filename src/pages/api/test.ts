import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {
  console.log(" --- api/test POST --- ");
  const body = await request.json();
  return new Response(
    JSON.stringify({
      email: body.email,
      password: body.password,
      status: "ok",
    })
  );
}

export async function GET({ request }: APIContext) {
  return new Response(
    JSON.stringify({
      name: "Astro",
      url: "https://astro.build/",
    })
  );
}
