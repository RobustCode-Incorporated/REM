import axios from "axios";

const BASE_URL = "http://localhost:3000";

async function testEndpoint(name: string, url: string) {
  try {
    console.log("\n========================");
    console.log(`TESTING: ${name}`);
    console.log(`URL: ${url}`);

    const res = await axios.get(url);

    console.log("STATUS:", res.status);
    console.log("DATA:", res.data);
  } catch (err: any) {
    console.log("❌ ERROR:", err.response?.status || err.message);
    console.log(err.response?.data || err.message);
  }
}

async function runTests() {
  await testEndpoint("PRODUCTS", `${BASE_URL}/products`);
  await testEndpoint("SALES", `${BASE_URL}/sales`);
  await testEndpoint("DASHBOARD KPIS", `${BASE_URL}/dashboard/kpis`);
  await testEndpoint("CUSTOMERS", `${BASE_URL}/customers`);
}

runTests();