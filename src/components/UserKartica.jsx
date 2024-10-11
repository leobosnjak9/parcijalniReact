import React from "react";

const UserKartica = ({ userData, repos, handleReset }) => {
  return (
    <div className="user-card">
      <div>
        <img src={userData.avatar_url} alt="avatar" />
        <h2>{userData.name}</h2>
        <p>
          <strong>BIO:</strong> {userData.bio || "No bio available"}
        </p>
        <p>
          <strong>LOCATION:</strong> {userData.location || "N/A"}
        </p>
      </div>

      {repos.length > 0 && (
        <div className="repo-list">
          <h3>Repozitorij:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleReset} className="reset-button">
        Resetiraj
      </button>
    </div>
  );
};

export default UserKartica;
