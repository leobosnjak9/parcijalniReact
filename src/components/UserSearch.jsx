import React, { useState } from "react";
import UserKartica from "./UserKartica";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUserData(null);
    setRepos([]);

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const userData = await userResponse.json();
      setUserData(userData);
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!reposResponse.ok) {
        throw new Error("Repositories not found");
      }
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (err) {
      setError(err.message || "An error occurred");
      setUserData(null);
      setRepos([]);
    }
  };

  const handleReset = () => {
    setUsername("");
    setUserData(null);
    setRepos([]);
    setError(null);
  };

  return (
    <div className="container">
      <h1>GitHub Pretrživač</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Unesite GitHub username"
          className="input-field"
        />
        <button type="submit" className="button">
          Pretraži
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {userData && (
        <UserKartica
          userData={userData}
          repos={repos}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default UserSearch;
