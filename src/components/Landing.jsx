import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Landing = () => {
	return (
		<>
			<Card className="text-center">
				<Card.Header>About</Card.Header>
				<Card.Body>
					<Card.Title>Artist Discography</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						Search: Spotify API
					</Card.Subtitle>
					<Card.Text>
						Explore artists&apos; discographies using Spotify&apos;s
						API
					</Card.Text>
					<Button
						variant="outline-primary"
						as="a"
						href="https://developer.spotify.com/documentation/web-api"
					>
						Spotify Web API
					</Button>
				</Card.Body>
			</Card>
		</>
	);
};

export default Landing;
