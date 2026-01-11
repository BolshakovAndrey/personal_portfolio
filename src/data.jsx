import {
  FaAws,
  FaBootstrap,
  FaBriefcase,
  FaCode,
  FaCss3,
  FaDocker,
  FaEnvelopeOpen,
  FaFolderOpen,
  FaGraduationCap,
  FaHome,
  FaHtml5,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaUser,
} from 'react-icons/fa';

import {FiExternalLink, FiFileText, FiUser} from 'react-icons/fi';
import {SiDjango, SiExpress, SiMongodb, SiNginx, SiPostgresql, SiTypescript} from "react-icons/si";

import Work1 from './assets/project-1.gif';
import Work2 from './assets/project-2.jpeg';
import Work3 from './assets/project-3.jpeg';
import Work4 from './assets/project-4.jpeg';
import Work5 from './assets/project-5.jpeg';
import Work6 from './assets/project-6.jpeg';
import Work7 from './assets/project-7.jpeg';
import Work8 from './assets/Project-8.png';
import Work9 from './assets/project-9.gif';

import Theme1 from './assets/purple.png';
import Theme2 from './assets/red.png';
import Theme3 from './assets/blueviolet.png';
import Theme4 from './assets/blue.png';
import Theme5 from './assets/goldenrod.png';
import Theme6 from './assets/magenta.png';
import Theme7 from './assets/yellowgreen.png';
import Theme8 from './assets/orange.png';
import Theme9 from './assets/green.png';
import Theme10 from './assets/yellow.png';

export const links = [
  {
    id: 1,
    name: 'Home',
    icon: <FaHome className='nav__icon'/>,
    path: '/',
  },

  {
    id: 2,
    name: 'About',
    icon: <FaUser className='nav__icon'/>,
    path: '/about',
  },

  {
    id: 3,
    name: 'Portfolio',
    icon: <FaFolderOpen className='nav__icon'/>,
    path: '/portfolio',
  },

  {
    id: 4,
    name: 'Contact',
    icon: <FaEnvelopeOpen className='nav__icon'/>,
    path: '/contact',
  },
];

export const personalInfo = [
  {
    id: 1,
    title: 'First Name : ',
    description: 'Andrei',
  },

  {
    id: 2,
    title: 'Last Name : ',
    description: 'Bolshakov',
  },

  {
    id: 3,
    title: 'Freelance : ',
    description: 'Available',
  },

  {
    id: 4,
    title: 'Location : ',
    description: 'Beograd',
  },


  {
    id: 5,
    title: 'Email : ',
    description: 'abolshakovy@gmail.com',
  },

  {
    id: 6,
    title: 'Telegram : ',
    description: '@Bolshakov_Andrey',
  },

  {
    id: 7,
    title: 'Languages : ',
    description: 'Russian, English, Serbian',
  },
];

export const stats = [
  {
    id: 1,
    no: '10+',
    title: 'Years of <br /> Experience',
  },

  {
    id: 2,
    no: '37+',
    title: 'Completed <br /> Projects',
  },

  {
    id: 3,
    no: '13+',
    title: 'Happy <br /> Customers',
  },

  {
    id: 4,
    no: '3+',
    title: ' Awards <br /> Won',
  },
];

export const resume = [
  {
    id: 1,
    category: 'experience',
    icon: <FaBriefcase/>,
    year: '2023 - PRESENT',
    title: 'FullStack Web Developer <span> VoxLink </span>',
    desc: 'JavaScript (TypeScript) FullStack developer for VoxLink',
  },
  {
    id: 2,
    category: 'experience',
    icon: <FaBriefcase/>,
    year: '2022 - 2023',
    title: 'Web Developer <span> Freelancer </span>',
    desc: 'Latest freelance project - advanced telegram bot for "GoodChemistry" shop',
  },

  {
    id: 3,
    category: 'experience',
    icon: <FaBriefcase/>,
    year: '2022 - 2023',
    title: 'Backend Developer <span> Yandex.Practicum.Studio </span>',
    desc: 'Project for the festival of young playwrights "Lubimovka"',
  },

  {
    id: 4,
    category: 'experience',
    icon: <FaBriefcase/>,
    year: '2020 - 2022',
    title: 'Web Developer <span> Yandex Practicum </span>',
    desc: "Apprenticeship, training on the course Web development and Python Backend development.",
  },

  {
    id: 5,
    category: 'education',
    icon: <FaGraduationCap/>,
    year: '2021 - 2022',
    title: 'Web Developer <span> Yandex Practicum </span>',
    desc: "Apprenticeship, training on the course Web development.",
  },

  {
    id: 6,
    category: 'education',
    icon: <FaGraduationCap/>,
    year: '2020 - 2021',
    title: 'BackEnd Developer <span> Yandex Practicum </span>',
    desc: 'Apprenticeship, Training on the course Python Bak-end Development.',
  },

  {
    id: 7,
    category: 'education',
    icon: <FaGraduationCap/>,
    year: '2007 - 2009',
    title: 'Master of Business Administration Degree <span> Moscow RANEPA </span>',
    desc: 'Business Administration in Strategy Marketing and Management, General',
  },
];

export const skills = [
  {
    id: 1,
    title: 'JavaScript',
    percentage: '100',
  },

  {
    id: 2,
    title: 'TypeScript',
    percentage: '100',
  },

  {
    id: 3,
    title: 'Node.js',
    percentage: '100',
  },

  {
    id: 4,
    title: 'Express.js',
    percentage: '100',
  },

  {
    id: 5,
    title: 'Python',
    percentage: '100',
  },

  {
    id: 6,
    title: 'Django',
    percentage: '100',
  },

  {
    id: 7,
    title: 'Nginx',
    percentage: '100',
  },

  {
    id: 8,
    title: 'Linux',
    percentage: '100',
  },
  {
    id: 9,
    title: 'HTML5',
    percentage: '100',
  },
  {
    id: 10,
    title: 'CSS3',
    percentage: '100',
  },
  {
    id: 11,
    title: 'React.js',
    percentage: '100',
  },
  {
    id: 12,
    title: 'Bootstrap',
    percentage: '100',
  },
  {
    id: 13,
    title: 'PostgreSQL',
    percentage: '100',
  },
  {
    id: 14,
    title: 'MongoDB',
    percentage: '100',
  },
  {
    id: 15,
    title: 'Docker',
    percentage: '100',
  },
  {
    id: 16,
    title: 'AWS',
    percentage: '100',
  },
];

export const icons = {
  Python: <FaPython size={60}/>,
  JavaScript: <FaJs size={60}/>,
  TypeScript: <SiTypescript size={60}/>,
  "Node.js": <FaNodeJs size={60}/>,
  "Express.js": <SiExpress size={60}/>,
  Django: <SiDjango size={60}/>,
  CSS3: <FaCss3 size={60}/>,
  "React.js": <FaReact size={60}/>,
  HTML5: <FaHtml5 size={60}/>,
  PostgreSQL: <SiPostgresql size={60}/>,
  MongoDB: <SiMongodb size={60}/>,
  Docker: <FaDocker size={60}/>,
  AWS: <FaAws size={60}/>,
  Bootstrap: <FaBootstrap size={60}/>,
  Linux: <FaLinux size={60}/>,
  Nginx: <SiNginx size={60}/>,
}
export const portfolio = [
  {
    id: 8,
    img: Work8,
    title: 'Visual Script Editor',
    details: [
      {
        icon: <FiFileText />,
        title: 'Project : ',
        desc: 'A visual editor to design conversation scripts or any step-by-step process. Build visual scenarios with logical branching.',
      },
      {
        icon: <FaCode />,
        title: 'Technology : ',
        desc: 'React.js',
      },
      {
        icon: <FiExternalLink />,
        title: 'Preview : ',
        desc: <a href="https://bolshakovandrey.github.io/qcodes-react-demo-pages/"
                 target="_blank"
                 rel="noopener noreferrer">Live Demo</a>
      },
    ],
  },

  {
    id: 9,
    img: Work9,
    title: 'Business Lunch Delivery Bot',
    details: [
      {
        icon: <FiFileText />,
        title: 'Project : ',
        desc: 'Telegram bot for business lunch ordering and delivery management. Features include menu browsing, cart management, order processing, and Google Sheets integration.',
      },
      {
        icon: <FaCode />,
        title: 'Technology : ',
        desc: 'Python, aiogram, SQLite, Google Sheets API',
      },
      {
        icon: <FiExternalLink />,
        title: 'Preview : ',
        desc: <a href="http://t.me/DeliveryBot_mvp_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live</a>
      },
    ],
  },

  {
    id: 1,
    img: Work1,
    title: 'Assistance bot',
    details: [
      {
        icon: <FiFileText/>,
        title: '"GoodChemistry"',
        desc: ' Telegram Bot',
      },
      {
        icon: <FiUser/>,
        title: 'Client : ',
        desc: '"💊GoodChemistry shop"',
      },
      {
        icon: <FaCode/>,
        title: 'Language : ',
        desc: 'Python3 Aiogram',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="http://t.me/online_gc_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live</a>,
      },
    ],
  },

  {
    id: 2,
    img: Work2,
    title: 'Website - "The Place"',
    details: [
      {
        icon: <FiFileText/>,
        title: 'Mesto : ',
        desc: "The social network.",
      },
      {
        icon: <FiUser/>,
        title: 'Github : ',
        desc: <a href="https://github.com/BolshakovAndrey/react-mesto-api-full"
                 target="_blank"
                 rel="noopener noreferrer">Repo</a>,
      },
      {

        icon: <FaCode/>,
        title: 'Language : ',
        desc: 'React.JS Node.Js',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="https://bolshakov.nomoredomains.xyz/"
                 target="_blank"
                 rel="noopener noreferrer">Live Demo</a>,
      }
    ],
  },

  {
    id: 3,
    img: Work3,
    title: 'Adaptive website',
    details: [
      {
        icon: <FiFileText/>,
        title: 'Traveling in Russia : ',
        desc: 'Website',
      },
      {
        icon: <FiUser/>,
        title: 'Github : ',
        desc: <a href="https://github.com/BolshakovAndrey/russian-travel"
                 target="_blank"
                 rel="noopener noreferrer">Repo</a>,
      },
      {
        icon: <FaCode/>,
        title: 'Language : ',
        desc: "HTML5, CSS3, Figma",
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="https://bolshakovandrey.github.io/russian-travel/"
                 target="_blank"
                 rel="noopener noreferrer">Live Demo</a>,
      },
    ],
  },

  {
    id: 4,
    img: Work4,
    title: 'Library website',
    details: [
      {
        icon: <FiFileText/>,
        title: '"Movies-explorer" - ',
        desc: 'Web App',
      },
      {
        icon: <FiUser/>,
        title: 'Github : ',
        desc: <a href="https://github.com/BolshakovAndrey/movies-explorer-frontend"
                 target="_blank"
                 rel="noopener noreferrer">Repo</a>,
      },
      {
        icon: <FaCode/>,
        title: 'Language : ',
        desc: 'React.js Node.js',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="https://bolshakovav.nomoredomains.xyz/movies"
                 target="_blank"
                 rel="noopener noreferrer">Live Demo</a>
      },
    ],
  },

  {
    id: 5,
    img: Work5,
    title: 'Web-portal',
    details: [
      {
        title: 'Stoked to be on the development team,  ',
        desc: 'as a backend developer!',
      },
      {
        title: 'Client : ',
        desc: 'Lyubimovka Festival',
      },
      {
                title: 'Language : ',
                desc: 'Python, Django, React.js',
            },
            {
                title: 'Preview : ',
                desc: <a href="https://lubimovka.art/"
                         target="_blank"
                         rel="noopener noreferrer">Live</a>
            },
    ],
  },

  {
    id: 6,
    img: Work6,
    title: 'E-Shop',
    details: [
      {
        icon: <FiFileText/>,
        title: 'Project : ',
        desc: 'E-Shop',
      },
      {
        icon: <FiUser/>,
        title: 'Client : ',
        desc: 'Toy4Joy',
      },
      {
        icon: <FaCode/>,
        title: 'Language : ',
        desc: 'jQuery, Bootstrap',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="https://www.toy4joy.site/"
                 target="_blank"
                 rel="noopener noreferrer">Live</a>
      },
    ],
  },

  {
    id: 7,
    img: Work7,
    title: 'Trading bots',
    details: [
      {
        icon: <FiFileText/>,
        title: 'Project : Trading robots ',
        desc: '',
      },
      {
        icon: <FiUser/>,
        title: 'Client : ',
        desc: 'Quant society',
      },
      {
        icon: <FaCode/>,
        title: 'Language : ',
        desc: 'C#',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        // eslint-disable-next-line
        desc: <a href=""
                 target="_blank"
                 rel="noopener noreferrer">Demo</a>
      },
    ],
  },
];

export const themes = [
  {
    id: 1,
    img: Theme1,
    color: 'hsl(252, 35%, 51%)',
  },

  {
    id: 2,
    img: Theme2,
    color: 'hsl(4, 93%, 54%)',
  },

  {
    id: 3,
    img: Theme3,
    color: 'hsl(271, 76%, 53%)',
  },

  {
    id: 4,
    img: Theme4,
    color: 'hsl(225, 73%, 57%)',
  },

  {
    id: 5,
    img: Theme5,
    color: 'hsl(43, 74%, 49%)',
  },

  {
    id: 6,
    img: Theme6,
    color: 'hsl(339, 81%, 66%)',
  },

  {
    id: 7,
    img: Theme7,
    color: 'hsl(80, 61%, 50%)',
  },

  {
    id: 8,
    img: Theme8,
    color: 'hsl(19, 96%, 52%)',
  },

  {
    id: 9,
    img: Theme9,
    color: 'hsl(88, 65%, 43%)',
  },

  {
    id: 10,
    img: Theme10,
    color: 'hsl(42, 100%, 50%)',
  },
];
