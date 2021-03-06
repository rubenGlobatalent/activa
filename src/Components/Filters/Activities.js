import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import { store, setActivityFilter, deleteFilters } from '../../redux/store'
import Header from './Components/Header'

const mapStateToProps = state => ({
    categories: state.categories_activities,
    selected: state.filters_activities
})

const Activities = props => {
    const initial = Object.fromEntries(props.selected.map(item => [item, true]))
    const [filter, setFilter] = useState(initial)

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
        },
        handleInput = e => {
            const payload = Object.assign(filter, { [e.target.name]: e.target.checked })
            setFilter(payload)
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
                                onChange={handleInput} />
                            {` ${activity}`}
                        </label>
                    </li>
                )
            })

    return (
        <div className="modal is-active animated fadeIn faster">
            <div className="modal-background" onClick={() => navigate('/')}></div>
            <div className="modal-card">
                <Header type={'Activity'}/>
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