import { useState } from "react";
import style from "./index.module.css";
import imagesInfo from "./data/data";

function Fade({ isActive }) {
    return(
        <div className={`${style.fade} ${isActive ? style.active : ""}`} data-fade></div>
    )
};

function Card({ src, title, description, isActive, id }) {
    return (
        <article 
            className={`${style.card} ${isActive ? style.active : ""}`} 
            data-card 
            data-id={id}
        >
            <div className={style.cardFront}>
                <h2 className={style.title}>{title}</h2>
                <div className={style.wrapperImg}>
                    <img className={style.imgAvatar} src={src} alt="chmonya" />
                </div>
                <button className={style.btnCard} data-btn-open>подробнее</button>
            </div>
            <div className={style.cardBack}>
                <p className={style.description}>{description}</p>
                <button className={style.btnClose} data-btn-close></button>
            </div>
        </article>
    );
}

export default function ListCard() {
    const [activeCardId, setActiveCardId] = useState(null);

    function handlerCardsState(event) {
        const cardElement = event.target.closest("[data-card]");
        if (!cardElement) return;

        const openBtn = event.target.closest("[data-btn-open]");
        const closeBtn = event.target.closest("[data-btn-close]");
        const cardId = cardElement.dataset.id;

        if (openBtn) {
            setActiveCardId(cardId);
        } else if (closeBtn) {
            setActiveCardId(null);
        }
    }

    const listItems = imagesInfo.map((person) => (
        <li className={style.item} key={person.key}>
            <Card 
                {...person} 
                isActive={person.key === activeCardId}
                id={person.key}
            />
        </li>
    ));

    return (
        <>
            <Fade isActive={activeCardId}/>
            <ul className={style.listCards} onClick={handlerCardsState}>
                {listItems}
            </ul>
        </>
    );
}
