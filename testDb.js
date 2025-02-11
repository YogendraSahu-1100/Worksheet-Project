import { testConnection } from "@/lib/dbConnection";

(async () => {
  const isConnected = await testConnection();
  console.log(isConnected ? "✅ Connection successful!" : "❌ Connection failed!");
})();
