/** @type {import('next').NextConfig} */

// htmlAttrs: {
//   lang: "en"
// },
// meta: [
//   { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
//   { name: "author", content: "Dawit (@oneminch)" },
//   { name: "robots", content: "index, follow" }
// ]
// link: [
//   {
//     rel: "apple-touch-icon",
//     sizes: "180x180",
//     href: "/apple-touch-icon.png"
//   },
//   {
//     rel: "icon",
//     sizes: "32x32",
//     href: "/favicon-32x32.png"
//   },
//   {
//     rel: "icon",
//     sizes: "16x16",
//     href: "/favicon-16x16.png"
//   },
//   {
//     rel: "manifest",
//     href: "/site.webmanifest"
//   }
// ],
// script: [
//   {
//     type: "text/partytown",
//     src: "https://measure.oneminch.dev/minch-measure",
//     async: true,
//     "data-website-id": "1e0e9daa-a25b-4943-af4e-68c91b2d3c72"
//   }
// ]
// modules: [
//     "@nuxtjs/partytown",
//     "@nuxtjs/turnstile",
//     "@nuxt/image",
//     "@nuxtjs/fontaine",
//     "@nuxtjs/tailwindcss",
//     "@vueuse/nuxt",
//     "nuxt-icon"
//   ],
//   tailwindcss: {
//     config: {
//       mode: "jit",
//       darkMode: "class",
//       content: [
//         "./app.vue",
//         "./error.vue",
//         "./components/**/*.vue",
//         "./layouts/**/*.vue",
//         "./pages/**/*.vue"
//       ]
//     }
//   },

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
