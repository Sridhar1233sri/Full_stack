import React, { useState } from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const AppDownload = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false); // New state for dashboard visibility

  const handleSubmit = () => {
    const newReview = {
      name,
      rating,
      review,
    };

    setReviews([...reviews, newReview]);

    setName('');
    setRating(0);
    setReview('');
  };

  const handleSeeAllReviews = () => {
    setShowAllReviews(!showAllReviews);
    setShowDashboard(false); // Hide dashboard when viewing reviews
  };

  const handleDashboard = () => {
    setShowDashboard(!showDashboard);
    setShowAllReviews(false); // Hide reviews when viewing dashboard
  };

  // Dashboard Calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : 0;
  const ratingCounts = [1, 2, 3, 4, 5].map(star => reviews.filter(r => r.rating === star).length);

  // Pie Chart Data
  const pieChartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        data: ratingCounts,
        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb', '#4bc0c0', '#ff9f40'],
        hoverBackgroundColor: ['#ff6384', '#ffcd56', '#36a2eb', '#4bc0c0', '#ff9f40'],
      },
    ],
  };

  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br />Tomato App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <h3>Give Your Feedback</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="feedback-input"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="feedback-input"
        >
          <option value="0">Star Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="feedback-input feedback-textarea"
        ></textarea>

        <div className="feedback-buttons">
          <button onClick={handleSubmit} className="feedback-btn">Submit</button>
          <button onClick={handleSeeAllReviews} className="feedback-btn">
            {showAllReviews ? 'Hide All Reviews' : 'See All Reviews'}
          </button>
          <button onClick={handleDashboard} className="feedback-btn">
            {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
          </button>
        </div>
      </div>

      {/* Display All Reviews Section */}
      {showAllReviews && (
        <div className="all-reviews">
          <h3>All Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((rev, index) => (
              <div key={index} className="review-item">
                <p><strong>{rev.name}</strong> - {rev.rating} Stars</p>
                <p>{rev.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}

      {/* Dashboard Section */}
      {showDashboard && (
        <div className="dashboard">
          <h3>Review Dashboard</h3>
          <p><strong>Total Reviews:</strong> {totalReviews}</p>
          <p><strong>Average Rating:</strong> {averageRating} Stars</p>
          <div className="rating-breakdown">
            <p><strong>Rating Breakdown:</strong></p>
            <ul>
              {ratingCounts.map((count, index) => (
                <li key={index}>{index + 1} Stars: {count}</li>
              ))}
            </ul>
          </div>
          {/* Pie Chart for Rating Breakdown */}
          <div className="rating-piechart">
            <h4>Rating Distribution</h4>
            <Pie data={pieChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppDownload;
