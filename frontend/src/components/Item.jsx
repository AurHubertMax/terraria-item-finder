import React from "react";
import "../styles/Item.css";

export default function ItemSearch({item}) {
    return (
        <div className="item-style">
            <a href={`https://terraria.wiki.gg/wiki/${item.name}`} target="_blank" rel="noopener noreferrer">{item.name}</a>
        </div>
    );
}