import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import { store, setActivityFilter, deleteFilters } from '../../redux/store'

const mapStateToProps = state => ({
    categories: state.categories_activities,
    selected: state.filters_activities
})

const Activities = props => {

    const [filter, setFilter] = useState({})

    const submitFilter = () => {
        const selected = Object.entries(filter)
            .filter(filter => filter[1])
            .map(filter => filter[0])

        store.dispatch(setActivityFilter(selected))
        navigate('/')
    },
        clearFilter = () => {
            setFilter({})
            store.dispatch(deleteFilters())
            navigate('/')
        }

    const selected = Object.fromEntries(
        props.categories.map(category => [category, props.selected.includes(category)])
    ),
        activities = props.categories
            .sort((a, b) => a.localeCompare(b))
            .map(activity => {
                return (
                    <li key={activity}>
                        <label className="checkbox is-size-6">
                            <input type="checkbox"
                                name={activity}
                                defaultChecked={selected[activity]}
                                onChange={e => setFilter(() => {
                                    return Object.assign(filter, { [e.target.name]: e.target.checked })
                                })} />
                            {` ${activity}`}
                        </label>
                    </li>
                )
            })

    return (
        <div className="modal is-active animated fadeIn faster">
            <div className="modal-background" onClick={() => navigate('/')}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <h2 className="modal-card-title is-size-5 has-text-weight-light">Actividades</h2>
                    <button className="delete" onClick={() => navigate('/')}></button>
                </header>
                <section className="modal-card-body">
                    <ul>
                        {activities}
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

export default connect(
    mapStateToProps,
    null
)(Activities)