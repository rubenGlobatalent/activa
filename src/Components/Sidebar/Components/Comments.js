import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBold, faItalic, faUnderline, faList, faHeading } from '@fortawesome/free-solid-svg-icons'
import { useQuery, useMutation } from 'urql'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'

const style = {
    paddedBot: {
        paddingBottom: '1.5rem'
    }
}

const mapStateToProps = state => ({
    user: state.user
}),
    toMarkdown = editorState => {
        return draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
    }

const Comment = props => {
    return (
        <article className="media container">
            <div className="media-content">
                <div className="content">
                    <p><strong className="is-size-5 has-text-primary">{props.username}</strong> <time className="is-size-7 has-text-primary">{formatRelative(new Date(props.date), new Date(), { locale: es, weekStartsOn: 1 })}</time></p>
                    {props.comment}
                </div>
            </div>
        </article>
    )
},
    RichEditor = props => {
        const { t } = useTranslation('general', { useSuspense: false })

        const [editorState, setEditorState] = useState(EditorState.createEmpty())

        const inputElement = useRef(null)

        const submitComment = async event => {
            event.preventDefault()
            try {
                console.log(await executeMutation())

            }
            catch (error) {
                console.log(error)
            }
        },
            textBold = () => {
                setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
            },
            textItalic = () => {
                setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
            },
            textUnderline = () => {
                setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
            },
            textUnorderedList = () => {
                setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
            },
            textHeader = () => {
                setEditorState(RichUtils.toggleBlockType(editorState, 'header-six'))
            },
            handleKeyCommand = (command, editorState) => {
                const newState = RichUtils.handleKeyCommand(editorState, command)

                if (newState) {
                    setEditorState(newState);
                    return 'handled'
                }
                return 'not-handled'
            },
            focusOnEditor = () => {
                // `current` points to the mounted text input element
                inputElement.current.focus();
            }


        const [result, executeMutation] = useMutation(gql`
                mutation {
                    comments(author: "${props.user.uid}", activity: "${props.activity}", comment: "${toMarkdown(editorState)}", date: "${new Date().toISOString()}", username: "${props.user.displayName}"){
                        id
                        comment
                        activity
                    }
                }
              `
        )

        return (
            <form style={style.paddedBot} onSubmit={submitComment}>
                <div className="field">
                    <p className="control">
                        <input className={`input has-text-primary is-static`} type="text" value={props.user.displayName} readOnly />
                    </p>
                </div>
                <div className="field">
                    {/* 
                <div className="buttons">
                    <button className="button" type="button">
                        <FontAwesomeIcon className="icon is-size-7" icon={faBold} onClick={textBold} />
                    </button>
                    <button className="button" type="button">
                        <FontAwesomeIcon className="icon is-size-7" icon={faItalic} onClick={textItalic} />
                    </button>
                    <button className="button" type="button">
                        <FontAwesomeIcon className="icon is-size-7" icon={faUnderline} onClick={textUnderline} />
                    </button>
                    <button className="button" type="button">
                        <FontAwesomeIcon className="icon is-size-7" icon={faList} onClick={textUnorderedList} />
                    </button>
                    <button className="button" type="button">
                        <FontAwesomeIcon className="icon is-size-7" icon={faHeading} onClick={textHeader} />
                    </button>
                </div> */}

                    <div className="control" onClick={focusOnEditor}>
                        <div className="textarea content text-area-overflow">
                            <Editor
                                spellCheck={true}
                                editorState={editorState}
                                handleKeyCommand={handleKeyCommand}
                                onChange={setEditorState}
                                stripPastedStyles={true}
                                ref={inputElement}
                            />
                        </div>
                    </div>
                    <button className="button is-small is-primary is-pulled-right has-text-weight-bold">{t('comments.sendComment')}</button>
                </div>
            </form>
        )
    },
    LogIn = () => {
        return (
            <>
                <p className="has-text-weight-bold has-text-centered">Registrate para poder comentar</p>
                <div className="buttons is-centered">
                    <button className="button is-primary is-small has-text-weight-bold">Registrate</button>
                </div>
            </>
        )
    },
    UpdateProfile = () => {
        return (
            <>
                <p className="has-text-centered has-text-weight-bold ">
                    Actualiza tu perfil con tu nombre de usuario para poder comentar
                </p>

                <div className="buttons is-centered">
                    <button className="button is-primary is-small has-text-weight-bold">Actualiza tu perfil</button>
                </div>
            </>
        )
    },
    Comments = props => {

        const [result] = useQuery({
            query: gql`
            {
                comments (activity: "${props.activity}") {
                    author
                    comment
                    date
                    username
                }
            }
          `
        })

        if (result.error) return <p></p>
        if (result.fetching) return <p></p>

        console.log(result.data.comments)

        const comments = result.data.comments.map(comment => <li key={comment.id} style={style.paddedBot}><Comment {...comment} /></li>)
        return (
            <>
                <hr className="navbar-divider" />
                {props.user ? (props.user.displayName ? <RichEditor activity={props.activity} user={props.user} /> : <UpdateProfile />) : <LogIn />}
                <ul>
                    {comments}
                </ul>
            </>
        )
    }

export default connect(
    mapStateToProps,
    null
)(Comments)
