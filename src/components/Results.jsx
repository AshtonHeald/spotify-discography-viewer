// Results.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import useAccessToken from "../hooks/useAccessToken";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Custom DisabledLink component
const DisabledLink = ({ to, disabled, children, className, ...props }) => {
	const classes = disabled ? `${className} disabled` : className;
	if (disabled) {
		return (
			<div className={classes} {...props}>
				{children}
			</div>
		);
	} else {
		return (
			<Link to={to} className={classes} {...props}>
				{children}
			</Link>
		);
	}
};

const Results = () => {
	const [searchResults, setSearchResults] = useState([]);
	const accessToken = useAccessToken();
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("q") || "";

	useEffect(() => {
		const fetchResults = async () => {
			if (searchTerm) {
				try {
					const response = await axios.get(
						`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=10&market=US`,
						{
							headers: {
								Authorization: "Bearer " + accessToken,
							},
						}
					);
					setSearchResults(response.data.artists.items || []);
				} catch (error) {
					console.error("Error searching for artists:", error);
				}
			}
		};

		fetchResults();
	}, [searchTerm, accessToken]);

	return (
		<div>
			<ListGroup className="gap-3">
				<Row className="row-gap-3">
					{searchResults.map((artist) => (
						<Col md={6} key={artist.id}>
							<DisabledLink
								to={`/artists/${artist.id}`}
								disabled={!artist.images[0]}
								className="artist-link link-underline link-underline-opacity-0"
							>
								<ListGroup.Item className="d-flex align-items-center">
									<img
										src={
											artist.images[0]
												? artist.images[0].url
												: "src/assets/no-image.webp"
										}
										alt={artist.name}
										style={{
											width: "50px",
											height: "50px",
											aspectRatio: "1/1",
											marginRight: "1rem",
										}}
									/>
									{artist.name}
								</ListGroup.Item>
							</DisabledLink>
						</Col>
					))}
				</Row>
			</ListGroup>
		</div>
	);
};

export default Results;
