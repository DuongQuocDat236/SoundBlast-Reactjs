import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const FeedbackPage = () => {
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    gender: "",
    comment: "",
  });
  const [status, setStatus] = useState({ success: false, error: false, loading: false });
  const [charCount, setCharCount] = useState(0);
  const maxChars = 300;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "comment" && value.length > maxChars) return;
    setForm({ ...form, [name]: value });
    if (name === "comment") setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });

    axios
      .post("http://localhost:8000/api/feedback", form)
      .then(() => {
        setStatus({ success: true, error: false, loading: false });
        setForm({ nickname: "", email: "", gender: "", comment: "" });
        setCharCount(0);
      })
      .catch(() => {
        setStatus({ success: false, error: true, loading: false });
      });
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/images/feedback/feedback.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", padding: "60px 0" }}>
        <Container>
          <h2 className="text-center fw-bold mb-4 text-black">📬 SEND FEEDBACK</h2>
          <div
            className="mx-auto p-4 rounded shadow-sm"
            style={{ maxWidth: "600px", backgroundColor: "#FFF9E6" }}
          >
            {status.success && <Alert variant="success">🎉 Feedback sent successfully!</Alert>}
            {status.error && <Alert variant="danger">❌ Something went wrong. Try again.</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#333" }}>Nickname</Form.Label>
                <Form.Control
                  name="nickname"
                  type="text"
                  placeholder="Enter your nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#FFF", borderColor: "#ccc" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#333" }}>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#FFF", borderColor: "#ccc" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#333" }}>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: "#FFF", borderColor: "#ccc" }}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: "#333" }}>Comment (max {maxChars} characters)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  rows={4}
                  placeholder="Your feedback..."
                  value={form.comment}
                  onChange={handleChange}
                  required
                  style={{ whiteSpace: "pre-wrap", backgroundColor: "#FFF", borderColor: "#ccc" }}
                />
                <Form.Text className="text-muted">{charCount}/{maxChars} characters</Form.Text>
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status.loading}
                  style={{
                    backgroundColor: "#FF4040",
                    borderColor: "#FF4040",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#FF4040";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#FF4040";
                    e.target.style.color = "#fff";
                  }}
                >
                  {status.loading ? <Spinner size="sm" animation="border" /> : "Send Feedback"}
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FeedbackPage;