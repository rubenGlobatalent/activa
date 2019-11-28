import React, { useState } from 'react'
import * as firebase from 'firebase'
import { Link, navigate } from '@reach/router'
import { NotificationManager } from 'react-notifications'
import { useTranslation } from 'react-i18next'


const style = {
    display: 'block'
}

const removePoint = async (id, collection) => {
    try {
        firebase.firestore().collection(collection).doc(id).delete()
        NotificationManager.success('Actividad eliminada con éxito.')
    }
    catch (error) {
        console.error(error)
        NotificationManager.error('Ha ocurrido un error al eliminar la actividad.')
    }
    finally {
        navigate('/')
    }

}

const Footer = props => {
    const [confirmation, setConfirmation] = useState(false),
    { t } = useTranslation('general', { useSuspense: false })
    if (props.user) {
        if (props.user.uid === props.creatorUID || props.user.uid === 'poV55zFFd9aepcRuZWhYnV8RD1a2') {
            if (confirmation) {
                return (
                    <footer className="card-footer" style={style}>

                        <div className="buttons is-centered">
                            <button className="button is-danger is-small" onClick={() => removePoint(props.id, props.collection)}>{t(`confirm`)}</button>
                            <button className="button is-light is-small" onClick={() => setConfirmation(false)}>{t(`cancel`)}</button>
                        </div>

                    </footer>

                )
            }

            else {
                return (
                    <footer className="card-footer" style={style}>

                        <div className="buttons is-centered">
                <button className="button is-danger is-small" onClick={() => setConfirmation(true)}>{t(`remove${props.type}`)}</button>
                            <Link className="button is-primary is-small" to={'edit'}>{t(`edit${props.type}`)}</Link>
                        </div>

                    </footer>

                )
            }
        }
        else return null

    }
    else return null
}

export default Footer