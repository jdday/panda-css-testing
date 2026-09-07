/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@acme/ui"],
  // Next 16 auto-writes AGENTS.md / CLAUDE.md into the app on dev/build; opt out.
  agentRules: false,
};

export default nextConfig;
