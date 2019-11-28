import React from 'react'
import { Link } from '@reach/router'
import { useTranslation } from 'react-i18next'


const Header = props => {
    const { t } = useTranslation('general', { useSuspense: false })

    return (
        <header className="modal-card-head">
<h2 className="modal-card-title is-size-5 has-text-weight-light">{t(`filter${props.type}`)}</h2>
            <Link className="delete" to={'/'}></Link>
        </header>
    )
}

export default Header
