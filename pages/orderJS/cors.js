const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.use("/order_detail", async (req, res) => {
	try {
		const response = await axios.post("https://sushistar-a3357-default-rtdb.firebaseio.com/orderDetail", {
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				// Add any other headers you need
			},
		});
		res.json(response.data); // Forward the response to the client
	} catch (error) {
		console.error("Error fetching data from Firebase:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(PORT, () => {
	console.log(`Proxy server listening on port ${PORT}`);
});
