import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAlbumData from "../hooks/useAlbumData";
import usePagination from "../hooks/usePagination"; // Make sure this path is correct
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";

function MyVerticallyCenteredModal({ album, ...props }) {
	const { albumData, trackData, loading, error } = useAlbumData(album.id);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{albumData.name}
				</Modal.Title>
			</Modal.Header>
				<img
					className="w-100"
					src={albumData.images[0]?.url}
					alt={albumData.name}
					/>
					<Modal.Header>

					<Modal.Title as="h5" className="ms-auto" >
				{albumData.release_date}
					</Modal.Title>
					</Modal.Header>
				<ListGroup as="ol" numbered className="list-group-flush">

					{trackData.items.map((track) => (
						<ListGroup.Item as="li" key={track.id}>{track.name}</ListGroup.Item>
						))}
	
						</ListGroup>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

const Albums = ({ albums, isDescending }) => {
	const [modalShow, setModalShow] = useState(false);
	const [selectedAlbum, setSelectedAlbum] = useState(null);

	if (!albums || !albums.items) {
		return <div>No albums available</div>;
	}

	const sortedAlbums = isDescending
		? albums.items
		: [...albums.items].reverse();
	const itemsPerPage = 6;
	const { currentPage, totalPages, setCurrentPage, paginationRange } =
		usePagination({
			itemsPerPage,
			itemsCount: sortedAlbums.length,
		});

	const albumsForCurrentPage = sortedAlbums.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handleAlbumClick = (album) => {
		setSelectedAlbum(album);
		setModalShow(true);
	};
	// Generate pagination items
	const paginationItems = [];
	if (totalPages > 1) {
		paginationItems.push(
			<Pagination.First
				key="first"
				onClick={() => setCurrentPage(1)}
				disabled={currentPage === 1}
			/>,
			<Pagination.Prev
				key="prev"
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
			/>
		);
	}
	// Always add the first page
	paginationItems.push(
		<Pagination.Item
			key={1}
			active={1 === currentPage}
			onClick={() => setCurrentPage(1)}
		>
			1
		</Pagination.Item>
	);
	// Ellipsis for beginning gap
	if (paginationRange[0] > 2) {
		paginationItems.push(
			<Pagination.Ellipsis key="startEllipsis" disabled />
		);
	}
	// Dynamic range
	paginationRange.forEach((number) => {
		if (number !== 1 && number !== totalPages) {
			paginationItems.push(
				<Pagination.Item
					key={number}
					active={number === currentPage}
					onClick={() => setCurrentPage(number)}
				>
					{number}
				</Pagination.Item>
			);
		}
	});
	// Ellipsis for ending gap
	if (paginationRange[paginationRange.length - 1] < totalPages - 1) {
		paginationItems.push(
			<Pagination.Ellipsis key="endEllipsis" disabled />
		);
	}
	// Always add the last page if more than one page
	if (totalPages > 1) {
		paginationItems.push(
			<Pagination.Item
				key={totalPages}
				active={totalPages === currentPage}
				onClick={() => setCurrentPage(totalPages)}
			>
				{totalPages}
			</Pagination.Item>,
			<Pagination.Next
				key="next"
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage === totalPages}
			/>,
			<Pagination.Last
				key="last"
				onClick={() => setCurrentPage(totalPages)}
				disabled={currentPage === totalPages}
			/>
		);
	}

	return (
		<>
			<Row className="row-gap-4" id="albums">
				{albumsForCurrentPage.map((album) => (
					<Col lg={6} key={album.id}>
						<Card
							as="button"
							className="p-0 album-button"
							onClick={() => handleAlbumClick(album)}
						>
							<Card.Img
								src={album.images[0]?.url}
								alt={album.name}
							/>
						</Card>
					</Col>
				))}
			</Row>
			<Pagination className="mb-0">{paginationItems}</Pagination>
			{selectedAlbum && (
				<MyVerticallyCenteredModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					album={selectedAlbum}
				/>
			)}
		</>
	);
};

export default Albums;
