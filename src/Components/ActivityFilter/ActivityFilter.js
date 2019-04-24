import React, { useState } from 'react'

export default function ActivityFilter(props) {

    const [filter, setFilter] = useState({}),

        submitFilter = () => {
            props.updateFilters('activityFilter',
                Object.entries(filter)
                    .filter(filter => filter[1])
                    .map(filter => filter[0])
            )
        }

    if (props.visible) {


        const selected = Object.fromEntries(
            props.data.map(activity => [activity.name, props.selected.includes(activity.name)])
        ),
        activities = props.data.map(activity => {
            return (
                <li key={activity.name}>
                    <label className="checkbox is-size-6">
                        <input type="checkbox"
                            name={activity.name}
                            defaultChecked={selected[activity.name]}
                            onChange={e => setFilter(() => {
                                // We create those variables because it doesn't let us directly put using dot notation
                                // on Object.assign (which we use because spread notation throws an error after the
                                // first change of state)
                                const name = e.target.name,
                                    checked = e.target.checked
                                return Object.assign(filter, { [name]: checked })
                            })} />
                        {` ${activity.name}`}
                    </label>
                </li>
            )
        });

        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => props.toggleComponent('activityFilter')}></div>
                <div className="modal-card">
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
                        <button className="button" onClick={() => submitFilter()}>Filtrar</button>
                        <button className="button" onClick={() => props.clearFilters()}>Eliminar todos los filtros</button>
                    </footer>
                </div>
            </div>
        )
    }
    else {
        return (
            null
        )
    }

}