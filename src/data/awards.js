// The awards FRC Team 2714 won in my seasons on the team, newest season
// first, as The Blue Alliance lists them at `team.href`. They are the
// team's awards. An award given to one team member by name (Dean's List,
// FIRST Leadership) is that person's and is not listed.
// `banner` names the picture of the season's blue winner banner,
// public/imgs/banner-<banner>-560.webp, drawn from The Blue Alliance's own
// banner. Within a season the event win is first, then the newest award.
export const team = {
    name: 'FRC Team 2714',
    href: 'https://www.thebluealliance.com/team/2714',
};

const seasons = [
    {
        year: 2026,
        banner: 'fort-worth-2026',
        awards: [
            { name: 'District Event Winner', event: 'Fort Worth District' },
            { name: 'Excellence in Engineering Award', event: 'Fort Worth District' },
        ],
    },
    {
        year: 2025,
        banner: 'fort-worth-2025',
        awards: [
            { name: 'District Event Winner', event: 'Fort Worth District' },
            { name: 'Innovation in Control Award', event: 'Texas District Championship' },
            { name: 'Autonomous Award', event: 'Fort Worth District' },
            { name: 'Excellence in Engineering Award', event: 'Waco District' },
        ],
    },
];

export default seasons;
