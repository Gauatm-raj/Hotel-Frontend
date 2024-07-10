import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "./RoomPaginator";
import { Button } from "react-bootstrap";
import RoomCard from "../room/RoomCard";

const RoomSearchResult = ({ result, onClearSearch }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultPerpage = 3;
  const totalResults = result.length;
  let totalPages;
  totalPages = Math.ceil(totalResults / totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultPerpage;
  const endIndex = startIndex + resultPerpage;
  const paginatorResult = result.slice(startIndex, endIndex);

  return (
    <>
      {result.length > 0 ? (
        <div>
          <h5 className="text-center mt-5"> Search Result</h5>
          <Row>
            {paginatorResult.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </Row>
          <Row>
            {totalResults > resultPerpage && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant="secondary" onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default RoomSearchResult;
