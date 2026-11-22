import React from 'react';

// The link from a section on the home page to the page with everything in
// it: its words, then an arrow that steps to the right when the link is
// pointed at. `place` is `head`, at the end of the heading's row, or `foot`,
// under the tiles; only one shows, depending on the width of the screen.
// `rest` finishes the link's words where there is only room to show the
// start of them: it is read out and seen by search engines, but not shown.
const More = ({ href, place, rest, children }) => (
    <a className={`more more-${place}`} href={href}>
        <span>
            {children}
            {rest && <span className="visually-hidden"> {rest}</span>}
        </span>
        <svg
            className="more-arrow"
            viewBox="0 0 16 16"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
        </svg>
    </a>
);

export default More;
