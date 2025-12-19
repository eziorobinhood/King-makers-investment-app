const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { phnumber, referral_code } = req.body;
  try {
    await pool.query('INSERT INTO users (phnumber, referral_code) VALUES ($1, $2)', [phnumber, referral_code]);
    res.status(201).send("User registered!");
  } catch (err) {
    // Postgres error code 23505 is a Unique Violation
    if (err.code === '23505') {
      return res.status(400).json({ error: "This phone number is already registered." });
    }
    res.status(500).send("Server Error");
  }
});

app.get('/users/admin', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
    
});


app.get('/users/referral_code', async(req, res)=>{
  try {
    const referral_code = await pool.query("SELECT phnumber,referral_code FROM users");
    res.json(referral_code.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

const removeDuplicates = async () => {
  try {
    const sql = `
      DELETE FROM users a
      USING users b
      WHERE a.id > b.id 
      AND a.phnumber = b.phnumber;
    `;

    const result = await pool.query(sql);
    console.log(`Cleaned up ${result.rowCount} duplicate entries.`);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

removeDuplicates();

app.listen(3000, () => console.log('Server running on port 3000'));