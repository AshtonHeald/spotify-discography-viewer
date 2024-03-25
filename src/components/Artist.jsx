import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { LiaSpotify } from "react-icons/lia";

const Artist = ({ artist, topTracks }) => {
	return (
		<div className="d-grid gap-4">
			<Card>
				<Card.Header as="h4">{artist.name}</Card.Header>
				<Card.Img
					className="rounded-0"
					src={artist.images[0]?.url}
					alt={artist.name}
				/>
				<Button
					as="a"
					href={artist.external_urls.spotify}
					variant="primary"
					className="rounded-0 rounded-bottom-1 d-flex justify-content-center align-items-center fw-semibold"
				>
					<LiaSpotify size="28" /> Artist Page
				</Button>
			</Card>
			<Card>
				<Card.Header as="h6">Top Tracks</Card.Header>
				<ListGroup as="ol" numbered className="list-group-flush">
					{topTracks.tracks.map((track) => (
						<ListGroup.Item as="li" key={track.id}>
							{track.name}
						</ListGroup.Item>
					))}
				</ListGroup>
			</Card>
		</div>
	);
};

export default Artist;
