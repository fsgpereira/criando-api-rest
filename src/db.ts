import { Pool } from "pg";

const connectionString = 'postgres://pgfpcncg:HQwC0p2j9h0yWZvrYeo6H9hgTg7K-Cso@kesavan.db.elephantsql.com/pgfpcncg';
const db = new Pool({ connectionString });

export default db;