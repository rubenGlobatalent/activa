import React from 'react'
import { Link, navigate } from "@reach/router"
import { useTranslation } from 'react-i18next'

const AskRegistration = props => {
    const { t } = useTranslation('general', { useSuspense: false })

    return (
        <div className="modal is-active animated fadeIn faster">
            <div className="modal-background" onClick={() => navigate('/')}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <h2 className="modal-card-title is-size-5 has-text-weight-light">{t('register')}</h2>
                    <Link to={'/'} className="delete"></Link>
                </header>

                <section className="modal-card-body">
                    <p className="is-size-6 has-text-centered has-text-weight-bold">{t(`haveToRegister${props.type}`)}</p>
                </section>

                <footer className="modal-card-foot buttons is-centered">
                    <div className="field is-grouped">
                        <div className="control">
                            <Link to={'/'} className='button is-primary'>{t('close')}</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default AskRegistration