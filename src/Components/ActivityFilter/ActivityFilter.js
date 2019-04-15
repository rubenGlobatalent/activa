import React, { useState } from 'react'

export default function ActivityFilter(props) {

    if (props.visible) {
        const activities = props.data.map(activity => {
            return (
                <li key={activity}>
                    <label className="checkbox">
                        <input type="checkbox" />
                        {activity}
                    </label>
                </li>
            )
        });
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => props.toggleComponent('activityFilter')}></div>
                <form className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Actividades</h2>
                        <button className="delete" onClick={() => props.toggleComponent('activityFilter')}></button>
                    </header>
                    <section className="modal-card-body">
                        <ul>
                            {activities}
                        </ul>
                    </section>
                    <footer className="modal-card-foot buttons is-centered">
                        <button type='submit' className="button">Filtrar</button>
                    </footer>
                </form>
            </div>
        )
    }
    else {
        return (
            null
        )
    }

}