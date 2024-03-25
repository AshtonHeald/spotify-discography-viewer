// Search.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsSearch } from "react-icons/bs";

const Search = () => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        navigate(`/results?q=${inputValue.replace(/\s/g, "+")}`);
    };

    return (
        <div>
            <Form onSubmit={handleSearch}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search for an artist"
                    />
                    <Button
                        variant="primary"
                        type="submit" // Make this button submit the form
                        className="d-flex align-items-center"
                    >
                        <BsSearch className="d-inline-block d-sm-none" size={16} />{" "}
                        {/* Show on xs screens */}
                        <span className="d-none d-sm-inline-block">
                            Search
                        </span>{" "}
                        {/* Show on sm and larger screens */}
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default Search;