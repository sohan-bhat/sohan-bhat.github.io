import React from 'react';

// The link from a section on the home page to the page with everything in
// it: its words, then an arrow that steps to the right when the link is
// pointed at. `place` is `head`, at the end of the heading's row, or `foot`,
// under the tiles; only one shows, depending on the width of the screen.
const More = ({ href, place, children }) => (
    <a className={`more more-${place}`} href={href}>
        {children}
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
