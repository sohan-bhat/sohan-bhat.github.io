import React, { useEffect, useRef } from 'react';
import { WORK } from '../content';
import '../styles/Card.css';

const Media = ({ media }) => {
    if (media.pair) {
        return (
            <div className="card-pair">
                {media.pair.map((photo, i) => (
                    <figure key={photo.src}>
                        <img
                            src={`/imgs/${photo.src}-400.webp`}
                            srcSet={`/imgs/${photo.src}-400.webp 400w, /imgs/${photo.src}-600.webp 600w, /imgs/${photo.src}-800.webp 800w`}
                            sizes="(max-width: 720px) 44vw, 190px"
                            width="800"
                            height="800"
                            alt={photo.alt}
                        />
                        <figcaption>
                            ({'ab'[i]}) {photo.label}
                        </figcaption>
                    </figure>
                ))}
            </div>
        );
    }
    return (
        <img
            className="card-media"
            src={`/imgs/${media.src}-560.webp`}
            srcSet={`/imgs/${media.src}-560.webp 560w, /imgs/${media.src}-1120.webp 1120w`}
            sizes="(max-width: 720px) 100vw, 400px"
            width="1120"
            height="700"
            alt={media.alt}
        />
    );
};

// The details for one item, on an index card: a modal dialog, centered on
// larger screens and a bottom sheet on phones. The card keeps one size, so
// its controls never move while stepping through the list; the body under
// them scrolls if it has to. The native dialog traps focus and closes on Escape.
const InfoCard = ({ index, onStep, onClose }) => {
    const dialog = useRef(null);
    const body = useRef(null);
    const closeButton = useRef(null);
    const pressedBackdrop = useRef(false);
    const item = index === null ? null : WORK[index];

    useEffect(() => {
        const element = dialog.current;
        if (!item) {
            if (element.open) element.close();
            return;
        }
        if (!element.open) {
            element.showModal();
            closeButton.current.focus();
            return;
        }
        // Stepped to another item: start it at the top, and if the focused link
        // went away with the old item, keep focus inside the card.
        body.current.scrollTop = 0;
        if (!element.contains(document.activeElement)) closeButton.current.focus();
    }, [item]);

    const close = () => dialog.current.close();

    // Clicks on the dialog element itself land on the backdrop. Close only for a
    // single click that also started there, so a text selection dragged out of
    // the card, or the second click of a double-click on a row, doesn't close it.
    const onPointerDown = (event) => {
        pressedBackdrop.current = event.target === dialog.current;
    };
    const onClick = (event) => {
        if (event.target === dialog.current && pressedBackdrop.current && event.detail < 2) close();
    };

    const onKeyDown = (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft') onStep(-1);
        if (event.key === 'ArrowRight') onStep(1);
    };

    return (
        <dialog
            ref={dialog}
            className="card"
            aria-labelledby="card-title"
            onClose={onClose}
            onPointerDown={onPointerDown}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            {item && (
                <>
                    <div className="card-head">
                        <div className="card-heading">
                            <h2 className="card-title" id="card-title">
                                {item.title}
                            </h2>
                            <p className="card-meta">
                                {item.type}, {item.span || `${item.month} ${item.year}`}
                            </p>
                        </div>
                        <div className="card-nav">
                            <p className="card-count">
                                {index + 1} of {WORK.length}
                            </p>
                            <button type="button" className="card-button" onClick={() => onStep(-1)} aria-label="Previous project">
                                <span aria-hidden="true">←</span>
                            </button>
                            <button type="button" className="card-button" onClick={() => onStep(1)} aria-label="Next project">
                                <span aria-hidden="true">→</span>
                            </button>
                            <button ref={closeButton} type="button" className="card-button" onClick={close} aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>

                    <article className="card-body" ref={body}>
                        {/* Announces the new item when stepping; the rest of the page is inert. */}
                        <p className="visually-hidden" aria-live="polite">
                            {item.title}
                        </p>

                        <Media key={item.id} media={item.media} />

                        <div className="card-text">
                            <p className="card-line">{item.line}</p>

                            <dl className="card-facts">
                                {item.facts.map(([label, value]) => (
                                    <div key={label}>
                                        <dt>{label}</dt>
                                        <dd>{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <ul className="card-links">
                                {item.links.map((link) => (
                                    <li key={link.label}>
                                        <a className="card-link" href={link.href} target="_blank" rel="noreferrer">
                                            {link.label}
                                            <span aria-hidden="true"> ↗</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </>
            )}
        </dialog>
    );
};

export default InfoCard;
