import React, { useRef, useState } from 'react';
import projects from '../data/projects';
import '../styles/Projects.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Projects as a git graph, newest commit on top. The graph shows only each
// project's name. The projects to look at first are commits on main; the rest
// sit on a side branch for their kind. Pointing at a commit previews that one
// project beside the graph, picking it checks it out, and the branch names in
// the command above the graph fold a branch away.
const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const monthOf = (p) => MONTHS[Number(p.date.slice(5, 7)) - 1];
const yearOf = (p) => p.date.slice(0, 4);
const branchOf = (p) => (p.featured ? 'main' : p.branch);

// Every branch, main first, then in the order each first appears.
const BRANCHES = [...new Set(sorted.map(branchOf))].sort((a, b) => (b === 'main') - (a === 'main'));

// A muted hue for each side branch, so a branch reads as one thing and its
// name in the command matches its line. Main stays cream.
const TINTS = ['#8fb39f', '#a79ad1', '#86a8cf', '#cf93a0', '#cdb98a'];
const tintOf = (branch) => (branch === 'main' ? undefined : TINTS[(BRANCHES.indexOf(branch) - 1) % TINTS.length]);

// The graph's measurements, in px. They match --row and --root in
// Projects.css.
const ROW = 44;
const ROOT = 30;
const LANE = 30;
const X0 = 12;

// Where everything goes, for the projects on show. Main is lane 0. A side
// branch runs from its newest commit down to its oldest, then curves into
// main one row further down. A branch that reaches further back sits further
// out, so its curve does not cross a nearer branch. Main runs on down to the
// root, the first commit.
const plan = (rows) => {
    const count = rows.length;
    const oldest = {};
    rows.forEach((p, i) => {
        if (branchOf(p) !== 'main') oldest[branchOf(p)] = i;
    });
    const side = Object.keys(oldest).sort((a, b) => oldest[a] - oldest[b]);
    const x = (branch) => X0 + (branch === 'main' ? 0 : side.indexOf(branch) + 1) * LANE;
    const y = (i) => i * ROW + ROW / 2;
    const rootY = count * ROW + ROOT / 2;

    const lines = side.map((branch) => {
        const tip = rows.findIndex((p) => branchOf(p) === branch);
        const from = y(oldest[branch]);
        const to = oldest[branch] + 1 < count ? y(oldest[branch] + 1) : rootY;
        const bend = (to - from) * 0.55;
        return {
            branch,
            to,
            d: `M${x(branch)} ${y(tip)}V${from}C${x(branch)} ${from + bend} ${X0} ${to - bend} ${X0} ${to}`,
        };
    });

    const firstMain = rows.findIndex((p) => branchOf(p) === 'main');
    const top = Math.min(firstMain === -1 ? rootY : y(firstMain), ...lines.map((line) => line.to));

    return {
        width: X0 * 2 + side.length * LANE,
        height: count * ROW + ROOT,
        rootY,
        main: `M${X0} ${top}V${rootY}`,
        lines,
        commits: rows.map((p, i) => ({ id: p.id, branch: branchOf(p), cx: x(branchOf(p)), cy: y(i) })),
    };
};

const Links = ({ project }) => (
    <div className="project-links">
        {project.links.map((link) => (
            <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="project-link text-link"
                title={link.title}
                aria-label={`${project.title} ${link.title || link.label}`}
            >
                {link.label}
            </a>
        ))}
    </div>
);

// One project in full: its screenshot, name and links, the one short line
// (then who it was built with, each as @name), and its kind, stack and date.
const Detail = ({ project, shown, warm }) => (
    <article className="detail" id={`project-${project.id}`} hidden={!shown}>
        <a className="detail-shot" href={project.links[0].url} target="_blank" rel="noreferrer" tabIndex={-1}>
            <img
                src={`/imgs/card-${project.image}-560.webp`}
                srcSet={`/imgs/card-${project.image}-560.webp 560w, /imgs/card-${project.image}-1120.webp 1120w`}
                sizes="(max-width: 760px) calc(100vw - 3rem), 640px"
                width="560"
                height="350"
                alt={project.alt}
                loading={warm ? 'eager' : 'lazy'}
                decoding="async"
            />
        </a>
        <div className="detail-head">
            <h3 className="detail-title">
                {project.title}
                {project.retired && <span className="detail-note">Retired</span>}
            </h3>
            <Links project={project} />
        </div>
        <p className="detail-line">
            {project.line}
            {project.team && ', with '}
            {project.team &&
                project.team.map((person, i) => (
                    <React.Fragment key={person.name}>
                        {i > 0 && ' and '}
                        <a className="project-person text-link" href={person.url} target="_blank" rel="noreferrer">
                            @{person.name}
                        </a>
                    </React.Fragment>
                ))}
        </p>
        <p className="detail-meta">
            <span>{project.kind}</span>
            <span>{project.stack.join(', ')}</span>
            <time dateTime={project.date}>
                {monthOf(project)} {yearOf(project)}
            </time>
        </p>
    </article>
);

const Projects = () => {
    // The branches on show, the commit checked out, and the one the pointer
    // is over, which previews without checking out.
    const [branches, setBranches] = useState(BRANCHES);
    const [head, setHead] = useState((sorted.find((p) => p.featured) || sorted[0]).id);
    const [peek, setPeek] = useState(null);
    // The branch name the pointer is over in the command, which lights up
    // that branch.
    const [peekBranch, setPeekBranch] = useState(null);
    // Once someone reaches for the graph, the other screenshots load in the
    // background, so a preview shows at once.
    const [warm, setWarm] = useState(false);
    const buttons = useRef({});

    const rows = sorted.filter((p) => branches.includes(branchOf(p)));
    const graph = plan(rows);
    const shownId = rows.some((p) => p.id === peek) ? peek : head;
    const lit = peekBranch || branchOf(sorted.find((p) => p.id === shownId));

    // Folding a branch away never empties the graph, and if it takes the
    // checked-out commit with it, the newest commit left is checked out.
    const toggle = (branch) => {
        const next = branches.includes(branch) ? branches.filter((b) => b !== branch) : BRANCHES.filter((b) => b === branch || branches.includes(b));
        if (!next.length) return;
        setBranches(next);
        setPeek(null);
        const left = sorted.filter((p) => next.includes(branchOf(p)));
        if (!left.some((p) => p.id === head)) setHead(left[0].id);
    };

    const onKeyDown = (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        const next = rows[rows.findIndex((p) => p.id === head) + (event.key === 'ArrowDown' ? 1 : -1)];
        if (!next) return;
        event.preventDefault();
        setHead(next.id);
        buttons.current[next.id].focus();
    };

    return (
        <section className="projects" id="projects">
            <div className="container">
                <h2 className="section-title">Projects<span className="title-period">.</span></h2>

                <div className="git">
                    <div className="git-graph" onPointerEnter={() => setWarm(true)} onFocus={() => setWarm(true)}>
                        <p className="git-command" role="group" aria-label="Branches shown in the graph">
                            <span aria-hidden="true">git log --graph</span>
                            {BRANCHES.map((branch) => (
                                <button
                                    key={branch}
                                    type="button"
                                    className="git-branch"
                                    aria-pressed={branches.includes(branch)}
                                    title={branches.includes(branch) ? `Hide ${branch}` : `Show ${branch}`}
                                    style={{ '--tint': tintOf(branch) }}
                                    onClick={() => toggle(branch)}
                                    onPointerEnter={(event) => event.pointerType === 'mouse' && branches.includes(branch) && setPeekBranch(branch)}
                                    onPointerLeave={() => setPeekBranch(null)}
                                >
                                    <span className="git-swatch" aria-hidden="true" />
                                    {branch}
                                </button>
                            ))}
                        </p>

                        <div className="git-log" style={{ '--graph': `${graph.width}px` }}>
                            <svg className="git-lines" width={graph.width} height={graph.height} viewBox={`0 0 ${graph.width} ${graph.height}`} aria-hidden="true">
                                {graph.lines.map((line) => (
                                    <path
                                        key={line.branch}
                                        className={`git-line${line.branch === lit ? ' is-lit' : ''}`}
                                        style={{ '--tint': tintOf(line.branch) }}
                                        d={line.d}
                                    />
                                ))}
                                <path className={`git-line git-main${lit === 'main' ? ' is-lit' : ''}`} d={graph.main} />
                                <circle className="git-root" cx={X0} cy={graph.rootY} r="3.5" />
                                {graph.commits.map((c) => (
                                    <circle
                                        key={c.id}
                                        className={`git-commit${c.branch === 'main' ? ' is-main' : ''}${c.id === shownId ? ' is-shown' : ''}${c.id === head ? ' is-head' : ''}`}
                                        style={{ '--tint': tintOf(c.branch) }}
                                        cx={c.cx}
                                        cy={c.cy}
                                        r={c.branch === 'main' ? 6.5 : 5}
                                    />
                                ))}
                            </svg>

                            <ol className="git-rows" onKeyDown={onKeyDown} onPointerLeave={() => setPeek(null)}>
                                {rows.map((p, i) => (
                                    <li key={p.id} className="git-row">
                                        {(i === 0 || yearOf(rows[i - 1]) !== yearOf(p)) && (
                                            <span className="git-year" aria-hidden="true">
                                                {yearOf(p)}
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            className={`git-pick${branchOf(p) === 'main' ? ' is-main' : ''}${p.id === shownId || branchOf(p) === peekBranch ? ' is-shown' : ''}`}
                                            aria-current={p.id === head ? 'true' : undefined}
                                            aria-controls="git-pane"
                                            aria-label={`${p.title}, ${p.kind}, ${monthOf(p)} ${yearOf(p)}`}
                                            ref={(el) => {
                                                buttons.current[p.id] = el;
                                            }}
                                            onClick={() => setHead(p.id)}
                                            onPointerEnter={(event) => event.pointerType === 'mouse' && setPeek(p.id)}
                                        >
                                            <span className="git-name">{p.title}</span>
                                            {p.id === head && <span className="git-head">HEAD</span>}
                                        </button>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Every project is in the page, so search engines see each
                        one. Only the one picked shows. */}
                    <div className="git-pane" id="git-pane" aria-live="polite">
                        {sorted.map((p) => (
                            <Detail key={p.id} project={p} shown={p.id === shownId} warm={warm} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
