// src/components/RatingStars.jsx
import React, { useState, useEffect } from 'react';

const RatingStars = ({ initialRating = 0, onRatingChange, maxStars = 5, editable = true }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleStarClick = (index) => {
        if (editable) {
            setRating(index);
            if (onRatingChange) {
                onRatingChange(index);
            }
        }
    };

    const handleMouseEnter = (index) => {
        if (editable) {
            setHoverRating(index);
        }
    };

    const handleMouseLeave = () => {
        if (editable) {
            setHoverRating(0);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {[...Array(maxStars)].map((_, index) => {
                index += 1;
                return (
                    <span
                        key={index}
                        className="star"
                        style={{
                            cursor: editable ? 'pointer' : 'default',
                            color: (hoverRating || rating) >= index ? 'gold' : 'lightgray', /* Warna bintang */
                            fontSize: '24px',
                            marginRight: '2px',
                            transition: 'color 0.2s ease'
                        }}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};

export default RatingStars;