import React, { useState } from 'react'
import { navigate } from '@reach/router'

const Districts = props => {

    const [filter, setFilter] = useState({}),

        submitFilter = () => {
            props.updateFilters('districtFilter',
                Object.entries(filter)
                    .filter(filter => filter[1])
                    .map(filter => filter[0])
            )
        },

        clearFilter = () => {
            setFilter({})
            props.clearFilters('districtFilter')
        }

    const selected = Object.fromEntries(
        props.data
            .map(district => [district, props.selected.includes(district)])
    ),
        districts = props.data.map(district => {
            return (
                <li key={district}>
                    <label className="checkbox is-size-6">
                        <input type="checkbox"
                            name={district}
                            defaultChecked={selected[district]}
                            onChange={e => setFilter(() => {
                                // We create those variables because it doesn't let us directly put using dot notation
                                // on Object.assign (which we use because spread notation throws an error after the
                                // first change of state)
                                const name = e.target.name,
                                    checked = e.target.checked
                                return Object.assign(filter, { [name]: checked })
                            })}
                        />
                        {` ${district}`}
                    </label>
                </li>
            )
        });
    return (
        <div className="modal is-active animated fadeIn faster">
            <div className="modal-background" onClick={() => navigate('/')}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <h2 className="modal-card-title is-size-5 has-text-weight-light">Zonas</h2>
                    <button className="delete" onClick={() => navigate('/')}></button>
                </header>
                <section className="modal-card-body">
                    <ul>
                        {districts}
                    </ul>
                </section>
                <footer className="modal-card-foot buttons is-centered">
                    <button className="button" onClick={submitFilter}>Filtrar</button>
                    <button className="button" onClick={clearFilter}>Eliminar todos los filtros</button>
                </footer>
            </div>
        </div>
    )

}

export default Districts