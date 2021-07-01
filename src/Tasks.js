import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Tasks({items, deleteTask, editTask}) {
    return (
        <div>
            { items.map((item) => {
                const { id, title } = item;
                return (
                  <article key={id} className="mytask">
                    <p>{title}</p>
                    <div className="buttons">
                      <button className="edit-btn" onClick={() => editTask(id)}>
                            <FaEdit />
                      </button>
                        <button className="delete-btn" onClick={() => deleteTask(id)}>
                            <FaTrash/>
                      </button>
                    </div>
                  </article>
                );
            })}
        </div>
    )
}

export default Tasks
