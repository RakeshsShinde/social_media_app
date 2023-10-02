export const getSenderInfo = (loggedinUser, users) => {
    if (users && users?.length > 0) {
        return users[0]?._id === loggedinUser?._id ? users[1] : users[0];
    }
}

export const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages?.length - 1 &&
        (messages[i + 1].sender?._id !== m.sender?._id ||
            messages[i + 1].sender?._id === undefined) && (
            messages[i].sender?._id !== userId
        )
    )
}

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages?.length - 1 &&
        messages[messages?.length - 1].sender?._id !== userId &&
        messages[messages?.length - 1].sender?._id
    )
}


export const messageMargin = (messages, m, i, userId) => {
    if (i < messages?.length - 1 &&
        (messages[i + 1].sender?._id == m.sender?._id ||
            messages[i + 1].sender?._id === undefined) && (
            messages[i].sender?._id !== userId
        )) {
        return 33;
    } else if (
        (i < messages?.length - 1 &&
            messages[i + 1].sender?._id !== m.sender?._id &&
            messages[i].sender?._id !== userId) ||
        (i === messages?.length - 1 && messages[i].sender?._id !== userId)
    )
        return 0;
    else return "auto";
}


export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender?._id === m.sender?._id;
}


export const formatLatestMessage = (message) => {
    var maxLength = 25;
    if (message?.length > maxLength) {
        return message?.slice(0, maxLength) + '...';
    } else {
        return message;
    }
}