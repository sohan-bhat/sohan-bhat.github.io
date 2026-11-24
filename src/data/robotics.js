// What I built for the robotics teams, and the robots. The home page shows
// the four marked `top`, each a picture and a title with its `link`, which
// is where the code or the record is. The Robotics page shows them all,
// grouped by `team`, with the `fact` and the `year`.
const shot = (name) => ({
    src: `/imgs/${name}-560.webp`,
    srcSet: `/imgs/${name}-560.webp 560w, /imgs/${name}-1120.webp 1120w`,
});

// A robot photo. They are square or upright, so a card shows the band of the
// photo around `focus`, which is where the robot is.
// `size` is the photo's own width and height, for the Robotics page, which
// shows it whole.
const photo = (name, focus, size) => ({ src: `/imgs/${name}-480.webp`, focus, size, photo: true });

const builds = [
    {
        ...shot('build-wins'),
        title: 'Fort Worth District wins',
        top: true,
        team: 2714,
        year: '2025 and 2026',
        alt: 'The robots of Team 10032, Team 2714 and Team 2728 behind three blue banners that read Winner 2026, FIRST in Texas District Fort Worth Event.',
        link: {
            label: 'The Blue Alliance',
            name: 'Team 2714 on The Blue Alliance',
            href: 'https://www.thebluealliance.com/team/2714',
        },
    },
    {
        ...shot('build-autos'),
        title: 'Autonomous routines',
        top: true,
        team: 2728,
        year: '2026',
        fact: 'I wrote 11 of the robot’s 12 autonomous routines',
        alt: 'TACO’s autonomous paths drawn in orange over a top view of the 2026 field.',
        link: {
            label: 'Code',
            name: 'Autonomous routines code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/tree/847a62c7e399331f45e12266f7274c0170c1b470/src/main/deploy/pathplanner/autos',
        },
    },
    {
        ...shot('build-airstrike'),
        title: 'Airstrike targeting app',
        team: 2714,
        year: '2026',
        fact: 'The drive team taps the field to set a passing target',
        alt: 'Airstrike showing a top view of the field with a target ring, the target position and a row of zone buttons.',
        link: {
            label: 'Code',
            name: 'Airstrike targeting app code',
            href: 'https://github.com/FRC2714/Airstrike-2026',
        },
    },
    {
        ...shot('build-hud'),
        title: 'Driver heads-up display',
        top: true,
        team: 2714,
        year: '2025',
        fact: 'We won the Innovation in Control Award at the Texas state championship with this display',
        alt: 'The heads-up display, a hexagon labeled Barge and Driver beside the connection status and time left.',
        link: {
            label: 'Code',
            name: 'Driver heads-up display code',
            href: 'https://github.com/FRC2714/bbq-hud/blob/1b67b4cf1a9ff527c1c5e01da16b8309465ed436/src/NetworkTablesHUD.tsx',
        },
    },
    {
        ...shot('build-limelight'),
        title: 'Limelight vision alignment',
        top: true,
        team: 2728,
        year: '2026',
        fact: 'I aim the robot at the hub within 0.3° with two Limelights',
        alt: 'The hub and its AprilTags on the Fort Worth field, with Team 2714’s robot in front and TACO behind.',
        link: {
            label: 'Code',
            name: 'Limelight vision alignment code',
            href: 'https://github.com/FRC2714/TACO-Rebuilt-2026/blob/847a62c7e399331f45e12266f7274c0170c1b470/src/main/java/frc/robot/subsystems/DriveSubsystem.java#L157-L208',
        },
    },
    {
        ...photo('robot-taco', '50% 0%', [480, 480]),
        title: 'TACO',
        team: 2728,
        year: '2026',
        alt: 'TACO, Team 2728’s 2026 robot, on red bumpers behind a blue FIRST Robotics Competition winner banner.',
    },
    {
        ...photo('robot-field', '50% 78%', [480, 600]),
        title: 'REBUILT robot',
        team: 2714,
        year: '2026',
        alt: 'Team 2714’s 2026 robot on the REBUILT field, with its Limelight camera at the front.',
    },
    {
        ...photo('robot-2025', '50% 40%', [480, 480]),
        title: 'Jerk Chicken',
        team: 2714,
        year: '2025',
        alt: 'Jerk Chicken, Team 2714’s 2025 robot, on the field with its blue arm swung out to the side.',
    },
];

export default builds;
