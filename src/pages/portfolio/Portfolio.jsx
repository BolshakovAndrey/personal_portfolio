import React, {useState} from 'react';
import {portfolio} from "../../data";
import PortfolioItem from "../../components/PortfolioItem";
import "./portfolio.css"

const categories = [
    {key: 'all', label: 'All'},
    {key: 'websites', label: 'Websites & Web Apps'},
    {key: 'bots', label: 'Telegram Bots & miniApp'},
];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('bots');

    const filtered = portfolio
        .filter((item) => activeCategory === 'all' || item.category === activeCategory)
        .sort((a, b) => b.id - a.id);

    return (
        <section className="portfolio section ">
            <h2 className="section__title">My <span>Portfolio</span></h2>

            <div className="portfolio__filters">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        className={`portfolio__filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.key)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="portfolio__container container grid">
                {filtered.map((item) => {
                    return <PortfolioItem key={item.id} {...item}/>;
                })}
            </div>
        </section>
    );
};

export default Portfolio;
