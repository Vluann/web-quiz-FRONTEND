import React from "react";
import { Link } from "react-router-dom";

function HeaderResults({ dataTopic }) {
  if (!dataTopic) return null;

  return (
    <div className="Header-questions">
      <div className="container">
        <div className="Header-questions__item">
          <div className="Header-questions__item-left">
            <h2>{dataTopic.name}</h2>
            <p>30 câu hỏi • 60 phút</p>
          </div>

          <div className="Header-questions__item-right">
            <Link to="/dashboard">DashBoard</Link>
          </div>

          <div className="Header-questions__item-right">
            <span>Kết Quả Bài Làm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderResults;
