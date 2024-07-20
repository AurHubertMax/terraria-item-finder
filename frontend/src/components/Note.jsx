import React from "react";
import "../styles/Note.css";

export default function Note({note, onDelete}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US');

    const renderNoteItems = (items) => {
        if (Array.isArray(items)) {
            return items.map((item, index) => (
                <li key={index}>
                    <a href={`https://terraria.wiki.gg/wiki/${item.name}`} target="_blank" rel="noopener noreferrer">
                        {item.name}
                    </a>
                </li>
            ));
        } else if (typeof items === 'object') {
            return Object.values(items).map((value, index) => (
                <li key={index}>{value}</li>
            ));
        } else {
            return items;
        }
    };

    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-items">
                {renderNoteItems(note.items)}
            </p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}