// import { generateNanoId } from '~/helpers/nanoid'

export const dynamic = 'auto'
export const dynamicParams = true
export const runtime = 'edge'

export async function GET(): Promise<Response> {
  return new Response(null, {
    status: 307, // Use 308 for a permanent redirect, 307 for a temporary redirect
    headers: {
      // Location: `/login?id=${generateNanoId()}`,
      Location: `/authentication`,
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
