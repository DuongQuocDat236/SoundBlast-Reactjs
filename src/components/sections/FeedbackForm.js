import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const FeedbackForm = () => {
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
    <section style={{ backgroundColor: "#E5E4DB", padding: "50px 0" }}>
      <Container>
        <h2 className="text-center fw-bold mb-4">📬 SEND FEEDBACK</h2>
        <div className="mx-auto p-4 rounded shadow-sm bg-light" style={{ maxWidth: "600px" }}>
          {status.success && <Alert variant="success">🎉 Feedback sent successfully!</Alert>}
          {status.error && <Alert variant="danger">❌ Something went wrong. Try again.</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                name="nickname"
                type="text"
                placeholder="Enter your nickname"
                value={form.nickname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Comment (max {maxChars} characters)</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                rows={4}
                placeholder="Your feedback..."
                value={form.comment}
                onChange={handleChange}
                required
                style={{ whiteSpace: "pre-wrap" }}
              />
              <Form.Text className="text-muted">
                {charCount}/{maxChars} characters
              </Form.Text>
            </Form.Group>

            <div className="text-center">
              <Button type="submit" variant="primary" disabled={status.loading}>
                {status.loading ? <Spinner size="sm" animation="border" /> : "Send Feedback"}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default FeedbackForm;
