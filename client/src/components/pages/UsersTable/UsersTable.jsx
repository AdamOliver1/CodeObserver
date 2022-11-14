import { useState } from "react";
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

import Table from "../../tools/Table";
import useAxiosGet from '../../../hooks/useAxiosGet';
import axios from "../../../api/axios";


const UsersTable = () => {
    const [isLinkOn, setIsLinkOn] = useState(false);
    const { state: codeBlock } = useLocation();
    const { data: users, error, isPending } = useAxiosGet('/api/users');
    const [tokenId, setTokenId] = useState('');

    let pageError = error;
    const currentHost = window.location.protocol + "//" + window.location.host;
    const student_login = "student_login";

    const handleUserClicked = async (e) => {
        const user = e.row;
        try {
            // send a req to server with the chosen user and codeBlock
            // receiving the id of a new token with chosen user and codeBlock indise
            const { data } = await axios.post(
                '/api/user-codeblock',
                { user, codeBlock_id: codeBlock._id }
            );
            setTokenId(data);
            setIsLinkOn(true);

        } catch (err) { pageError = err.message }


    }
    return (
        <Box sx={{
            height: 400,
            width: '100%',
        }}>
            {isLinkOn ? <Alert severity="success">
                <div>
                    Student Link:
                </div>
                <Link
                    to={`/shared-code-room/${tokenId}/${student_login}`}>
                    {`${currentHost}/shared-code-room/${tokenId}/${student_login}`}
                </Link>
                <div>
                    Teacher Link:
                </div>
                <Link
                    state={codeBlock}
                    to={`/shared-code-room/${tokenId}/n`}>
                    {`${currentHost}/shared-code-room/${tokenId}/n`}
                </Link>
            </Alert> : <></>}
            <Typography
                variant="h3"
                component="h3"
                sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
                Choose a user
            </Typography>

            {error && <div>{pageError}</div>}
            {isPending && <div>Loading...</div>}
            {users && <Table
                onRowClick={handleUserClicked}
                // show just students
                rows={users.filter(u => !u.isMentor).map(u => ({ id: u._id, ...u }))}
            />}
        </Box>
    );
}

export default UsersTable;