import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import { store, setDistrictFilter, deleteFilters } from '../../redux/store'
import Header from './Components/Header'

const mapStateToProps = state => ({
    districts: state.districts,
    selected: state.filters_districts
})

const Districts = props => {
    const initial = Object.fromEntries(props.selected.map(item => [item, true]))
    const [filter, setFilter] = useState(initial)

    const submitFilter = () => {
        const selected = Object.entries(filter)
            .filter(filter => filter[1])
            .map(filter => filter[0])

        console.log(selected)

        store.dispatch(setDistrictFilter(selected))
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
        props.districts.features.map(district => [district.properties.name, props.selected.includes(district.properties.name)])
    ),
        districts = props.districts.features.map(district => {
            return (
                <li key={district.properties.name}>
                    <label className="checkbox is-size-6">
                        <input type="checkbox"
                            name={district.properties.name}
                            defaultChecked={selected[district.properties.name]}
                            onChange={handleInput}
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
                <Header type={'District'} />
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