import React from 'react';
import '../styles/Cards.css';

// A card on the home page: a picture with only its title under it. What
// else there is to say, a line of text and the links, sits over the foot of
// the picture and shows when the card is pointed at, focused or tapped.
// `about` is that content; a card with none is just its picture and title.
const Card = ({ id, image, title, about, open, onToggle }) => {
    const picture = (
        <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.srcSet ? image.sizes : undefined}
            style={image.focus ? { objectPosition: image.focus } : undefined}
            width="560"
            height="350"
            alt={image.alt}
            loading="lazy"
            decoding="async"
        />
    );
    return (
        <li className={`card${open ? ' is-open' : ''}`}>
            <div className="card-frame">
                {about ? (
                    <>
                        <button
                            type="button"
                            className="card-shot"
                            aria-expanded={open}
                            aria-controls={`about-${id}`}
                            aria-label={`About ${typeof title === 'string' ? title : id}`}
                            onClick={onToggle}
                        >
                            {picture}
                        </button>
                        <div className="card-about" id={`about-${id}`}>
                            {about}
                        </div>
                    </>
                ) : (
                    <div className="card-shot">{picture}</div>
                )}
            </div>
            <h3 className="card-title">{title}</h3>
        </li>
    );
};

export default Card;
