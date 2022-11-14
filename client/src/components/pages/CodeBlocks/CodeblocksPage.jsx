import './CodeBlocks.css';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import useAxiosGet from '../../../hooks/useAxiosGet';
import { Typography } from '@mui/material';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-solarizedlight.css';
import { useNavigate } from "react-router-dom";

import useStyles from './CodeBlockStyles';

const CodeBlocksPage = () => {

    const navigate = useNavigate();
    const { data, isPending, error } = useAxiosGet('/api/codeblock');
    const classes = useStyles();
    const handleCodeChoice = (id) => {
        navigate('/users-table',
            {
                state: data.find(d => d._id === id)
            }
        );
    }

    return (
        <>
            <Typography className={classes.title}
                variant="h2"
                align="center"
            >
                Choose code block
            </Typography>
            {error && <div>{error}</div>}
            {isPending && <div>loading...</div>}
            {data && data.map(cb =>
                <div key={cb._id}>

                    <Typography className={classes.subtitle}
                        variant="h4"
                        align="center"
                    >
                        {cb.title}
                    </Typography>
                    <div onClick={() => handleCodeChoice(cb._id)}>

                        <Editor disabled className='Editor hover'
                            key={cb._id}
                            value={cb.code}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
















export default CodeBlocksPage;