import React from 'react';
import '../styles/Cards.css';

// A card on the home page: a picture with its title under it. `aside` is a
// link that sits beside the title. `about` is what else there is to say, a
// line of text and the links; it slides up over the foot of the picture
// while the card is pointed at or holds the keyboard's focus, and on a
// touch screen a tap on the picture opens and closes it.
const Card = ({ id, image, title, about, aside, open, onToggle, onClose }) => {
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
            {about ? (
                // A click with a mouse opens the card like a tap does, so it
                // closes again when the mouse leaves the picture.
                <div className="card-frame" onPointerLeave={(event) => event.pointerType === 'mouse' && open && onClose()}>
                    <button
                        type="button"
                        className="card-shot"
                        aria-expanded={open}
                        aria-controls={`about-${id}`}
                        aria-label={`About ${title}`}
                        onClick={onToggle}
                    >
                        {picture}
                    </button>
                    <div className="card-about" id={`about-${id}`}>
                        {about}
                    </div>
                </div>
            ) : (
                <div className="card-frame">
                    <div className="card-shot">{picture}</div>
                </div>
            )}
            <div className="card-head">
                <h3 className="card-title">{title}</h3>
                {aside}
            </div>
        </li>
    );
};

export default Card;
