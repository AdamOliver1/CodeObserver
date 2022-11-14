import { useState, useContext, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import jsCookie from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { highlight, languages } from 'prismjs/components/prism-core';
import { useParams } from 'react-router-dom';
import SocketContext from '../../../context/socketProvider';
import useAxiosPost from '../../../hooks/useAxiosPost';
import { Typography } from '@mui/material';

const SharedCodeRoom = () => {

    const { tokenId, student_login } = useParams();
    const { socketRef } = useContext(SocketContext);
    const { data, isPending, error } = useAxiosPost('/api/user-codeblock/verify', { tokenId })
    const navigate = useNavigate();
    const [code, setCode] = useState();
    const [isCodeExist, setIsCodeExist] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSolution, setIsSolution] = useState(false);

    const socket = socketRef.current;
    const solution = data?.solution;

    const handleOnCodeChanged = (value) => {
        // compare code and solution
        const solutionCompare = solution.split(" ").join("");
        const codeCompare = value.split(" ").join("").trim();
        if (solutionCompare === codeCompare) {
            setIsSolution(true);
        }

        setCode(value);
        // stedent sends code to mentor
        if (student_login) {
            socket.emit('send_code', {
                room: tokenId,
                code: value
            });
        }
    }

    useEffect(() => {
        // check if ths user is a logged out student
        if (
            student_login === "student_login" &&
            !jsCookie.get('loggedin')
        ) {
            navigate('/', { state: { tokenId: tokenId, student_login: student_login } });
        }
    }, [student_login, navigate, tokenId])

    useEffect(() => {
        if (data && data.code) setCode(data.code);
    }, [data])


    useEffect(() => {
        setIsCodeExist(true);
    }, [code])


    useEffect(() => {

        socket.emit('join_room', tokenId);
        // check if the user is a mentor
        if (!(student_login === "student_login")) {
            setIsDisabled(true);
            //mentor receives code from student
            socket.on('receive_code', data => {
                setCode(data);
            })
        }
    }, [socket, student_login, tokenId])

    return (
        <>
            {error && <div> {error}</div>}
            {isPending && <div> loading...</div>}
            {isCodeExist &&
                <Editor disabled={isDisabled}
                    value={code ?? ""} className="Editor"
                    onValueChange={handleOnCodeChanged}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                />
            }
            {isSolution && <><Typography variant="h3" className="smily"
                align="center">
                You reached the solution
            </Typography>
                <Typography variant="h1" className="smily"
                    align="center">
                    😃
                </Typography></>}
        </>
    )
}

export default SharedCodeRoom;