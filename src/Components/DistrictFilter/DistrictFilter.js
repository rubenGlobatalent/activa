import React, { useState } from 'react'

export default function DistrictFilter(props) {

    if (props.visible) {
        const districts = props.data.map(district => {
            return (
                <li key={district}>
                    <label className="checkbox">
                        <input type="checkbox" />
                        {district}
                    </label>
                </li>
            )
        });
        return (
            <div className="modal is-active">
                <div className="modal-background" onClick={() => props.toggleComponent('districtFilter')}></div>
                <form className="modal-card">
                    <header className="modal-card-head">
                        <h2 className="modal-card-title is-size-5 has-text-weight-light">Zonas</h2>
                        <button className="delete" onClick={() => props.toggleComponent('districtFilter')}></button>
                    </header>
                    <section className="modal-card-body">
                        <ul>
                            {districts}
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