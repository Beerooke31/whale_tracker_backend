import pg from "pg";
const { Client } = pg;
const client = new Client();
await client.connect();

try {
  const res = await client.query("SELECT $1::text as message", ["Buongiorno!"]);
  console.log(res.rows[0].message); //Buongiorno
} catch (error) {
  console.error(error);
} finally {
  await client.end();
}
