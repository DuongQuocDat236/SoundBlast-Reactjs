import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const renderStars = (count) => {
    return "⭐".repeat(count) + "☆".repeat(5 - count);
  };

  return (
    <section id="review" className="my-5 px-3">
      <h2 className="text-center fw-bold mb-4">📝 USER REVIEWS</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {reviews.map((review) => (
          <div className="col" key={review.id}>
            <Card className="h-100 shadow">
              <div className="d-flex justify-content-center mt-3">
                <img
                  src={`http://localhost:8000/${review.avatar}`}
                  alt={review.name}
                  className="rounded-circle"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title>{review.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {renderStars(review.rating)}
                </Card.Subtitle>
                <Card.Text>"{review.comment}"</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                {new Date(review.date).toDateString()}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;


