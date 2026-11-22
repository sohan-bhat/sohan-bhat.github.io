// The languages and tools in the home page's Skills list, each one I have
// shipped something with: the projects' stacks (Svelte is OpenHAL's
// dashboard), Java for the robots, PyTorch for LHD's experiments and MongoDB
// for the certificate. SciPy is numerics, not machine learning, hence that
// row's name. MCP leads its row: OpenHAL and wobbl are both built on it.
// PostgreSQL is spelled as on the CV.
const skills = [
    { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Go', 'Kotlin'] },
    { group: 'ML and numerics', items: ['PyTorch', 'NumPy', 'SciPy', 'TensorFlow Lite'] },
    { group: 'Web', items: ['React', 'Next.js', 'Node.js', 'Svelte', 'Astro', 'Three.js'] },
    { group: 'Protocols and databases', items: ['MCP', 'PostgreSQL', 'MongoDB'] },
];

export default skills;
