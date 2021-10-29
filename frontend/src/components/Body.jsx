import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const Body = () => {
  const [posts, setPosts] = useState({});
  const titleRef = useRef("");
  const bodyRef = useRef("");

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const newPost = { title, body };
    console.log(newPost);

    fetch("http://localhost:5000/posts", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const addedPost = data;
        const newPosts = [...posts, addedPost];
        setPosts(newPosts);
      });

    titleRef.current.value = "";
    bodyRef.current.value = "";
  };
  return (
    <BodyStyle>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="title" ref={titleRef} />
          <input type="text" placeholder="description" ref={bodyRef} />
          <input type="submit" value="submit" />
        </form>
      </div>
      <div className="container">
        {posts.length > 0 &&
          posts
            .slice(0)
            .reverse()
            ?.map((post) => {
              return (
                <div className="post__container">
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              );
            })}
      </div>
    </BodyStyle>
  );
};

const BodyStyle = styled.div`
  background-color: #5e8b7e;
  .form_container {
    text-align: center;
    padding: 2rem 1rem;

    form {
      display: flex;

      justify-content: center;
      align-items: stretch;
      input {
        background-color: #47776a;
        border: none;
        color: white;
        padding: 1rem;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
          rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        &::placeholder {
          color: #a58989;
        }

        &:focus {
          outline: none !important;
          box-shadow: 0 0 10px #c36839;
        }
        margin-left: 0.5rem;
        border-radius: 2px;
      }
      input[type="button"],
      input[type="submit"],
      input[type="reset"] {
        background-color: #c36839;
        border: none;
        color: white;
        padding: 16px 32px;
        text-decoration: none;

        cursor: pointer;
      }
    }
  }
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  }
  .post__container {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #47776a;
    box-shadow: 20px 20px 60px #508072, -20px -20px 60px #4d756a;
    border-radius: 2px;
    color: #374045;
    p {
      color: #5b5b5b;
    }
  }
`;
