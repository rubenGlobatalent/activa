import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import { store, setDistrictFilter, deleteFilters } from '../../redux/store'

const mapStateToProps = state => ({
    districts: state.districts,
    selected: state.filters_districts
})

const Districts = props => {

    const [filter, setFilter] = useState({})

    const submitFilter = () => {
        const selected = Object.entries(filter)
            .filter(filter => filter[1])
            .map(filter => filter[0])

        store.dispatch(setDistrictFilter(selected))
        navigate('/')
    },
        clearFilter = () => {
            setFilter({})
            store.dispatch(deleteFilters())
            navigate('/')
        }

    const selected = Object.fromEntries(
        props.districts.features.map(district => [district.properties.name, props.selected.includes(district.properties.name)])
    ),
        districts = props.districts.features.map(district => {
            return (
                <li key={district.properties.name}>
                    <label className="checkbox is-size-6">
                        <input type="checkbox"
                            name={district.properties.name}
                            defaultChecked={selected[district.properties.name]}
                            onChange={e => setFilter(() => {
                                return Object.assign(filter, { [e.target.name]: e.target.checked })
                            })}
                        />
                        {` ${district.properties.name}`}
                    </label>
                </li>
            )
        })

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

export default connect(
    mapStateToProps,
    null
)(Districts)