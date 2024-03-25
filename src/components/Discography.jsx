import useArtistData from "../hooks/useArtistData";
import { useParams } from "react-router-dom";
import Artist from "./Artist";
import Menu from "./Menu";
import Albums from "./Albums";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Discography = () => {
	const { artist_id } = useParams();
	const { artistData, topTracksData, albumsData, loading, error } =
		useArtistData(artist_id);
	const [isDescending, setIsDescending] = useState(true);

	const handleSort = () => {
		setIsDescending(!isDescending);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Row className="row-gap-3">
			<Col md={6} lg={4}>
				<Artist artist={artistData} topTracks={topTracksData} />
			</Col>
			<Col md={6} lg={8}>
				<div className="d-grid gap-3">
					<Menu handleSort={handleSort} isDescending={isDescending} />
					<Albums albums={albumsData} isDescending={isDescending} />
				</div>
			</Col>
		</Row>
	);
};

export default Discography;
