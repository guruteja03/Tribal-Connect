import { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addReview, getReviews } from '../../utils/storage';

function ReviewsPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const history = useMemo(() => getReviews().filter((item) => item.userId === user?.id).slice(0, 5), [user, message]);

  const submitReview = (event) => {
    event.preventDefault();
    addReview({
      userId: user?.id,
      userName: user?.name || 'Customer',
      rating,
      text: review.trim(),
    });
    setMessage('Review submitted.');
    setReview('');
  };

  return (
    <div className="mx-auto max-w-2xl card space-y-4">
      <h1 className="section-title">Leave a Review</h1>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      <form onSubmit={submitReview} className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Rating</label>
          <select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="rounded border border-tribal-300 px-3 py-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
        </div>
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          required
          rows="4"
          className="w-full rounded border border-tribal-300 px-3 py-2"
          placeholder="Share your experience"
        />
        <button type="submit" className="btn-primary">Submit Review</button>
      </form>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-tribal-800">Recent Reviews</h2>
        {history.length === 0 ? <p className="text-sm text-tribal-700">No reviews yet.</p> : null}
        {history.map((item) => (
          <div key={item.id} className="rounded border border-tribal-200 px-3 py-2 text-sm">
            <p className="font-medium">{item.rating}/5</p>
            <p className="text-tribal-700">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
