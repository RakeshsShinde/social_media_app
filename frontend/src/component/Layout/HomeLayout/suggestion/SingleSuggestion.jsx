import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { followUser } from '../../../../actions/userActions';
import { setUser } from '../../../../reducers/UserReducers/LoginSlice';
import { Link } from 'react-router-dom';
import useStyles from './singleSuggestion.style';

const SingleSuggestion = ({ user }) => {
    const classes = useStyles();
    const [follow, setfollow] = useState(false);
    const dispatch = useDispatch();
    const { user: loggedinUser } = useSelector((state) => state.Login);

    useEffect(() => {
        setfollow(loggedinUser?.following?.some((u) => u === user._id))
    }, [loggedinUser?.following])

    const handleFollow = async () => {
        setfollow((prev) => !prev);
        const { payload } = await dispatch(followUser({ userId: user._id }));
        await dispatch(setUser(payload?.user));
    }

    return (
        <Box className={classes.notiContainer}>
            <Stack direction='row' className={classes.singleNotification}>
                <Link to={`/profile/${user._id}`}>
                    <Avatar
                        sx={{ width: '45px', height: '45px', cursor: 'pointer' }}
                        src={user.profilePic?.url}>
                        alt={user.username}
                    </Avatar>
                </Link>
                <Stack direction='column' className={classes.body} >
                    <Typography variant='subtitle2' className={classes.username}>{user.username}</Typography>
                    <Typography variant='subtitle2' className={classes.message}>{user.email}</Typography>
                </Stack>
                <Box className={classes.iconContainer}>
                    {follow ? <FiUserCheck onClick={handleFollow} color='#0fa3b1' size={20} className={classes.icon} />
                        : <FiUserPlus onClick={handleFollow} size={20} className={classes.icon} />}
                </Box>
            </Stack>
        </Box>
    );
}

export default SingleSuggestion;