import React, { useState, useEffect } from "react";

export function App(props) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) => [data, ...prevPosts]);
        setNewPost({ title: "", body: "", userId: 1 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Generate a random color
  const getRandomColor = () => {
    const colors = ["#ff5733", "#fcba03", "#00ffbb", "#ff00c8", "#003fff"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  return (
    <>
      <header style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold", textShadow: "2px 2px 4px #000" }}>My News Website</h1>
          <nav>
            <ul style={{ listStyle: "none", display: "flex" }}>
              <li style={{ marginRight: "20px" }}>
                <a href="#" style={{ color: "#fff", textDecoration: "none", textShadow: "1px 1px 2px #000" }}>Home</a>
              </li>
              <li style={{ marginRight: "20px" }}>
                <a href="#" style={{ color: "#fff", textDecoration: "none", textShadow: "1px 1px 2px #000" }}>Categories</a>
              </li>
              <li>
                <a href="#" style={{ color: "#fff", textDecoration: "none", textShadow: "1px 1px 2px #000" }}>Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)" }}>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            style={{ display: "block", width: "96%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="body" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Body:</label>
          <textarea
            id="body"
            name="body"
            value={newPost.body}
            onChange={handleInputChange}
            style={{ display: "block", width: "96%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", height: "200px" }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: "#333", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", textTransform: "uppercase", fontWeight: "bold", cursor: "pointer" }}>Submit</button>
      </form>


      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "1200px", margin: "0 auto", paddingTop: "40px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              flex: "1 0 350px",
              margin: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
              overflow: "hidden",
              border: `4px solid ${getRandomColor()}` // add random border color
            }}
          >
            <h3
              style={{
                margin: "0 0 15px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                margin: "0",
                fontSize: "16px",
                color: "#666",
                lineHeight: "24px"
              }}
            >
              {post.body}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px"
              }}
            >
              <a
                href="#"
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  transition: "all 0.3s ease-in-out"
                }}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}