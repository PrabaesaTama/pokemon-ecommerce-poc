// components/CardList.tsx
import React, { useState, useMemo } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { usePagination } from "../hooks/UsePagination";
import { PokemonCard } from "../services/types/PokemonCardType";

interface CardListProps {
  cards: PokemonCard[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const itemsPerPage = 20;
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination<PokemonCard>(cards, itemsPerPage);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => goToPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return items;
  }, [currentPage, totalPages, goToPage]);

  if (cards === undefined || cards.length === 0) {
    return <div className="text-center py-5">No cards found</div>;
  }

  return (
    <div>
      {/* Pagination Info */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <small className="text-muted">
          Showing {startIndex}-{endIndex} of {totalItems} cards
        </small>
      </div>

      {/* Cards Grid */}
      <Container fluid>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {paginatedItems.map((card) => (
            <Col key={card.id}>
              <Card className="h-100">
                <div style={{ height: "360px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={card.getImageURL()}
                    alt={card.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "3/4",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{card.name}</Card.Title>
                  <Button variant="primary" className="mt-auto">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => goToPage(1)}
              disabled={!hasPrevPage}
            />
            <Pagination.Prev onClick={prevPage} disabled={!hasPrevPage} />

            {paginationItems}

            <Pagination.Next onClick={nextPage} disabled={!hasNextPage} />
            <Pagination.Last
              onClick={() => goToPage(totalPages)}
              disabled={!hasNextPage}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CardList;
