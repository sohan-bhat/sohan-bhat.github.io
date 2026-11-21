import React, { useEffect, useState } from 'react';
import '../styles/Cards.css';

// A tile on the home page: a picture with its title under it. `about` is
// what else there is to say, a line of text or the links; it slides up over
// the foot of the picture while the tile is pointed at or holds the
// keyboard's focus, and on a touch screen a tap on the picture opens and
// closes it.
const Card = ({ id, image, title, about, open, onToggle, onClose }) => (
    <li className={`card${open ? ' is-open' : ''}`}>
        {/* A click with a mouse opens the tile like a tap does, so it closes
            again when the mouse leaves the picture. */}
        <div className="card-frame" onPointerLeave={(event) => event.pointerType === 'mouse' && open && onClose()}>
            <button
                type="button"
                className="card-shot"
                aria-expanded={open}
                aria-controls={`about-${id}`}
                aria-label={`About ${title}`}
                onClick={onToggle}
            >
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
            </button>
            <div className="card-about" id={`about-${id}`}>
                {about}
            </div>
        </div>
        <h3 className="card-title">{title}</h3>
    </li>
);

// Which tile of a group was opened by a tap or a click, if any. A tap or
// click anywhere else closes it.
export const useOpenCard = () => {
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        if (!openId) return undefined;
        const close = (event) => {
            if (!event.target.closest('.card.is-open')) setOpenId(null);
        };
        document.addEventListener('pointerdown', close);
        return () => document.removeEventListener('pointerdown', close);
    }, [openId]);

    return {
        openId,
        toggle: (id) => setOpenId(id === openId ? null : id),
        close: () => setOpenId(null),
    };
};

export default Card;
