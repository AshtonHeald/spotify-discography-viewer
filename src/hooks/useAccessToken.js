import { useState, useEffect } from "react";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

function useAccessToken() {
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		// Fetch access token
		const authParameters = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body:
				"grant_type=client_credentials&client_id=" +
				CLIENT_ID +
				"&client_secret=" +
				CLIENT_SECRET,
		};

		fetch("https://accounts.spotify.com/api/token", authParameters)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to obtain access token");
				}
				return response.json();
			})
			.then((data) => setAccessToken(data.access_token))
			.catch((error) =>
				console.error("Error obtaining access token:", error)
			);
	}, []);

	return accessToken;
}

export default useAccessToken;
