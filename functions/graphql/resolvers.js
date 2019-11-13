const admin = require('firebase-admin')

/**
 * @typedef {Object} Comment
 * @property {string} activity Activity UID
 * @property {string} author Author UID
 * @property {string} id Comment UID
 * @property {string} comment Comment text
 * @property {string} date Date of posting 
 */

/**
 * Fetch all comments (if no activity is specified) or fetch comments from an activity
 * 
 * @param {Object} args Object to hold arguments to the function
 * @param {string} [args.activity] Activity UID to filter
 * @returns {Comment[]} An array of {@link Comment} objects
 */
exports.getComments = async (parent, args) => {
    try {
        const query = admin.firestore().collection('comments')
        let result

        if (args.activity)
            result = await query.where('activity', '==', args.activity).orderBy('date', 'desc').get()

        else {
            result = await query.get()
        }

        const response = result.docs
            .map(doc => {
                const id = doc.id,
                    data = doc.data()

                return { id: id, ...data, date: new Date(data.date.toDate()).toISOString() }
            })

        return response

    }
    catch (error) {
        return error
    }
}

/**
 * Fetch all comments (if no activity is specified) or fetch comments from an activity
 * 
 * @param {Object} args Object to hold arguments to the function
 * @property {string} args.activity Activity UID
 * @property {string} args.author Author UID
 * @property {string} args.comment Comment text
 * @property {string} args.date Date of posting
 * @returns {Comment} Returns the comment object
 */
exports.postComment = async (parent, args) => {
    try {
        const response = await admin.firestore().collection('comments').add({
            activity: args.activity,
            author: args.author,
            comment: args.comment,
            date: new Date(args.date),
            username: args.username
        })
        return { activity: args.activity, author: args.author, comment: args.comment, date: args.date, id: response.id, username: args.username }
    }
    catch (error) {
        console.error(error)
        return error
    }
}

/**
 * Delete a comment
 * 
 * @param {Object} args Object to hold arguments to the function
 * @property {string} args.id Comment UID
 * @returns {string} Returns the deleted comment ID
 */
exports.deleteComment = async (parent, args) => {
    try {
        await admin.firestore().collection('comments').doc(args.id).delete()
        return args.id
    }
    catch (error) {
        console.error(error)
        return error
    }
}