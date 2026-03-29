import {
  FaAws,
  FaBootstrap,
  FaBriefcase,
  FaCode,
  FaCss3,
  FaDocker,
  FaEnvelopeOpen,
  FaFolderOpen,
  FaGitAlt,
  FaGraduationCap,
  FaHome,
  FaHtml5,
  FaJs,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaTelegramPlane,
  FaUser,
} from 'react-icons/fa';

import {FiExternalLink, FiFileText, FiUser} from 'react-icons/fi';
import {
  SiDjango,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiFramer,
  SiJest,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiSentry,
  SiSqlite,
  SiStorybook,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";

import Work2 from './assets/project-2.jpeg';
import Work3 from './assets/project-3.jpeg';
import Work4 from './assets/project-4.jpeg';
import Work5 from './assets/project-5.jpeg';
import Work6 from './assets/project-6.jpeg';
import Work7 from './assets/project-7.jpeg';
import Work8 from './assets/Project-8.png';

// Bot screenshots from Antigravity (Telegram Web recordings)
import GC1 from './assets/bots/goodchemistry-01-start.png';
import GC2 from './assets/bots/goodchemistry-02-catalog.png';
import GC3 from './assets/bots/goodchemistry-03-product.png';
import GC4 from './assets/bots/goodchemistry-04-cart.png';
import GC5 from './assets/bots/goodchemistry-05-delivery.png';
import GC6 from './assets/bots/goodchemistry-06-order.png';
import DL1 from './assets/bots/delivery-01-start.png';
import DL2 from './assets/bots/delivery-02-category.png';
import DL3 from './assets/bots/delivery-03-dish.png';
import DL4 from './assets/bots/delivery-04-cart.png';
import MR1 from './assets/bots/marathon-01-start.png';
import MR2 from './assets/bots/marathon-02-chat.png';
import HT1 from './assets/bots/healthtracker-01-welcome.png';
import HT2 from './assets/bots/healthtracker-02-food.png';
import HT3 from './assets/bots/healthtracker-03-activities.png';
import HT4 from './assets/bots/healthtracker-04-report.png';
import HT5 from './assets/bots/healthtracker-05-stats.png';

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
    no: '13+',
    title: 'Years of <br /> Experience',
  },

  {
    id: 2,
    no: '30+',
    title: 'Completed <br /> Projects',
  },

  {
    id: 3,
    no: '30+',
    title: 'Happy <br /> Customers',
  },

  {
    id: 4,
    no: '3',
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
  { id: 1, title: 'JavaScript' },
  { id: 2, title: 'TypeScript' },
  { id: 3, title: 'Python' },
  { id: 4, title: 'React.js' },
  { id: 5, title: 'Next.js' },
  { id: 6, title: 'Node.js' },
  { id: 7, title: 'Express.js' },
  { id: 8, title: 'Fastify' },
  { id: 9, title: 'Django' },
  { id: 10, title: 'FastAPI' },
  { id: 11, title: 'HTML5' },
  { id: 12, title: 'CSS3' },
  { id: 13, title: 'Tailwind CSS' },
  { id: 14, title: 'MUI' },
  { id: 15, title: 'Bootstrap' },
  { id: 16, title: 'PostgreSQL' },
  { id: 17, title: 'MongoDB' },
  { id: 18, title: 'Redis' },
  { id: 19, title: 'SQLite' },
  { id: 20, title: 'Supabase' },
  { id: 21, title: 'Prisma' },
  { id: 22, title: 'Docker' },
  { id: 23, title: 'Nginx' },
  { id: 24, title: 'Linux' },
  { id: 25, title: 'AWS' },
  { id: 26, title: 'Git' },
  { id: 27, title: 'Vite' },
  { id: 28, title: 'Webpack' },
  { id: 29, title: 'Storybook' },
  { id: 30, title: 'Jest' },
  { id: 31, title: 'Sentry' },
  { id: 32, title: 'Framer Motion' },
  { id: 33, title: 'Aiogram' },
];

export const icons = {
  JavaScript: <FaJs size={60} />,
  TypeScript: <SiTypescript size={60} />,
  Python: <FaPython size={60} />,
  "React.js": <FaReact size={60} />,
  "Next.js": <SiNextdotjs size={60} />,
  "Node.js": <FaNodeJs size={60} />,
  "Express.js": <SiExpress size={60} />,
  Fastify: <SiFastify size={60} />,
  Django: <SiDjango size={60} />,
  FastAPI: <SiFastapi size={60} />,
  HTML5: <FaHtml5 size={60} />,
  CSS3: <FaCss3 size={60} />,
  "Tailwind CSS": <SiTailwindcss size={60} />,
  MUI: <SiMui size={60} />,
  Bootstrap: <FaBootstrap size={60} />,
  PostgreSQL: <SiPostgresql size={60} />,
  MongoDB: <SiMongodb size={60} />,
  Redis: <SiRedis size={60} />,
  SQLite: <SiSqlite size={60} />,
  Supabase: <SiSupabase size={60} />,
  Prisma: <SiPrisma size={60} />,
  Docker: <FaDocker size={60} />,
  Nginx: <SiNginx size={60} />,
  Linux: <FaLinux size={60} />,
  AWS: <FaAws size={60} />,
  Git: <FaGitAlt size={60} />,
  Vite: <SiVite size={60} />,
  Webpack: <SiWebpack size={60} />,
  Storybook: <SiStorybook size={60} />,
  Jest: <SiJest size={60} />,
  Sentry: <SiSentry size={60} />,
  "Framer Motion": <SiFramer size={60} />,
  Aiogram: <FaTelegramPlane size={60} />,
};
export const portfolio = [
  {
    id: 1,
    img: GC1,
    images: [GC1, GC2, GC3, GC4, GC5, GC6],
    category: 'bots',
    deviceType: 'mobile',
    title: 'GoodChemistry Bot',
    details: [
      {
        icon: <FiFileText/>,
        title: 'E-commerce bot for a supplement store',
        desc: 'Product catalog, smart cart, checkout flow, CDEK shipping integration, order logistics & tracking',
      },
      {
        icon: <FaCode/>,
        title: 'Stack : ',
        desc: 'Python, Aiogram, PostgreSQL, Redis',
      },
      {
        icon: <FiExternalLink/>,
        title: 'Preview : ',
        desc: <a href="http://t.me/online_gc_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live in Telegram</a>,
      },
    ],
  },

  {
    id: 2,
    img: Work2,
    category: 'websites',
    deviceType: 'desktop',
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
    category: 'websites',
    deviceType: 'desktop',
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
    category: 'websites',
    deviceType: 'desktop',
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
    category: 'websites',
    deviceType: 'desktop',
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
    category: 'websites',
    deviceType: 'desktop',
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
    category: 'bots',
    deviceType: 'desktop',
    title: 'Trading Bots',
    details: [
      {
        icon: <FiFileText/>,
        title: 'Algorithmic trading robots',
        desc: 'Automated strategies for stock & crypto markets with risk management and backtesting',
      },
      {
        icon: <FaCode/>,
        title: 'Stack : ',
        desc: 'C#, Trading APIs',
      },
    ],
  },

  {
    id: 8,
    img: Work8,
    category: 'websites',
    deviceType: 'desktop',
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
    img: DL1,
    images: [DL1, DL2, DL3, DL4],
    category: 'bots',
    deviceType: 'mobile',
    title: 'Delivery Bot',
    details: [
      {
        icon: <FiFileText />,
        title: 'Business lunch delivery service',
        desc: 'Daily menu management, ordering & cart, Google Sheets sync for kitchen, manager reports via chat',
      },
      {
        icon: <FaCode />,
        title: 'Stack : ',
        desc: 'Python, Aiogram, PostgreSQL, Google Sheets API',
      },
      {
        icon: <FiExternalLink />,
        title: 'Preview : ',
        desc: <a href="http://t.me/DeliveryBot_mvp_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live in Telegram</a>
      },
    ],
  },

  {
    id: 10,
    img: MR1,
    images: [MR1, MR2],
    category: 'bots',
    deviceType: 'mobile',
    title: 'Fitness Marathon Bot',
    details: [
      {
        icon: <FiFileText />,
        title: 'Gamified fitness challenge platform',
        desc: 'Team marathons, penalty system, leaderboards, Mini App with AI-powered step analysis',
      },
      {
        icon: <FaCode />,
        title: 'Stack : ',
        desc: 'Python, Aiogram, FastAPI, React, Railway, Netlify',
      },
      {
        icon: <FiExternalLink />,
        title: 'Preview : ',
        desc: <a href="https://t.me/slim_together_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live in Telegram</a>
      },
    ],
  },

  {
    id: 11,
    img: HT1,
    images: [HT1, HT2, HT3, HT4, HT5],
    category: 'bots',
    deviceType: 'mobile',
    title: 'AI Health Tracker',
    details: [
      {
        icon: <FiFileText />,
        title: 'AI-powered nutrition & wellness tracker',
        desc: 'Food photo analysis, AI step recognition, KBJU tracking, water intake, daily reports to TG group, referral system',
      },
      {
        icon: <FaCode />,
        title: 'Stack : ',
        desc: 'Python, Aiogram, OpenAI Vision API, PostgreSQL, Redis',
      },
      {
        icon: <FiExternalLink />,
        title: 'Preview : ',
        desc: <a href="https://t.me/online_gc_bot"
                 target="_blank"
                 rel="noopener noreferrer">Live in Telegram</a>
      },
    ],
  },
];

export const themes = [
  {
    id: 1,
    name: 'Royal Blue',
    color: 'hsl(225, 73%, 57%)', // Отличный контраст, классика
  },
  {
    id: 2,
    name: 'Deep Purple',
    color: 'hsl(271, 76%, 53%)', // Глубокий модный цвет
  },
  {
    id: 3,
    name: 'Crimson Red',
    color: 'hsl(340, 74%, 55%)', // Яркий, но читаемый красный акцент
  },
];
