import { BsSortDownAlt, BsSortUp } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";

const Menu = ({ handleSort, isDescending }) => {
  return (
    <div>
      <Button onClick={handleSort}>
        {isDescending ? 
        <BsSortDownAlt />
        : 
        <BsSortUp />
        }
      </Button>
    </div>
  )
}

export default Menu