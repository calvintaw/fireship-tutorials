import express from "express"; // import the Express framework to build a web server

const app = express(); // create an Express application instance
const PORT = 8080; // define which port your server will listen on

// Middleware to automatically parse incoming JSON request bodies
// (so you can access req.body without manually parsing it)
app.use(express.json());

// Start the server and log a message once it's running
app.listen(PORT, () => {
	console.log(`it's alive on http://localhost:${PORT}`);
});

// Define a GET endpoint (read operation)
// This route handles GET requests to /tshirt and returns a simple JSON response
app.get("/tshirt", (req, res) => {
	res.status(200).send({
		tshirt: "COOL",
		size: "large",
	});
});

// Define a POST endpoint (create operation)
// The :id in the URL means it's a *route parameter*, accessible as req.params.id
app.post("/tshirt/:id", (req, res) => {
	const { id } = req.params; // Extract the dynamic id from the URL path
	const { logo } = req.body; // Extract the logo value from the request body

	// If no logo is provided in the request body, return a 418 (I'm a teapot!) status code
	// 418 is just a joke status code from the HTTP spec — Fireship uses it for fun :)
	if (!logo) {
		return res.status(418).send({ message: "we need a logo!" });
	}

	// Otherwise, send back a custom message containing the provided logo and ID
	res.send({
		tshirt: `Tshirt with your ${logo} and ID of ${id}`,
	});
});
