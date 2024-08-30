import bundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: false, // process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});

const rewrites = () => {
  return [
    {
      source: "/zh/short-url/:slug*",
      destination: 'http://url.xulai.live/short-url/:slug*',
    },
    {
      source: "/en/short-url/:slug*",
      destination: 'http://url.xulai.live/short-url/:slug*',
    },
    {
      source: '/ai/:slug*',
      destination: 'https://api-demo.tiptap.dev/v1/ai/:slug*',
    },
    {
      source: '/api/:slug*',
      destination: 'http://123.56.176.92:5002/api/:slug*',
    }
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites,
  output: 'standalone',
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    SERVER_API_URL: '/api',
    COLLABORATION_API_URL: 'ws://123.56.176.92:5003/',
    NEXT_PUBLIC_LOCALE_PREFIX: 'always',
    NEXT_PUBLIC_TIPTAP_AI_APP_ID: '79drg0x6',
    NEXT_PUBLIC_TIPTAP_AI_TOKEN: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTk5MDQxNjl9.lYbRIEGpK2k5J8cRY-MEnx65gMn4uNx8YjUfBmGyn08',
    NEXT_PUBLIC_TIPTAP_AI_BASE_URL: '/ai',
    NEXT_PUBLIC_SHORT_URL: 'http://url.xulai.live',
    // ENABLE_ALIYUN_OSS: !!config.oss.aliyun.accessKeyId,
    // DNS_PREFETCH: (config.client.dnsPrefetch || '').split(' '),
    // SEO_APPNAME: config.client.seoAppName,
    // SEO_DESCRIPTION: config.client.seoDescription,
    // SEO_KEYWORDS: config.client.seoKeywords,
  },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    // additionalData: '@import "@/assets/styles/index.scss";',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https', //图片资源的协议
        hostname: 'img.leixu.live', //图片资源的域名
      },
    ],
  },
  poweredByHeader: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // 在构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    })
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // 或者指定具体的域名
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/bCccDwkKkN',
        destination: '/', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
};

export default withBundleAnalyzer(withNextIntl()(nextConfig));
