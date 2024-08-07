
const styles = {
    grid: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#111119',
        overflow: 'hidden',
        borderRadius: '20px',
    },
    heading: {
        marginTop: '1vh',
        marginBottom: '1vh',
        fontWeight: '800',
        fontSize: '1.8em',
    },
    textField: {
        height: '6vh',
        margin: '1vh 0',
        '& label': {
            color: '#7d5ffc',
        },
        '& label.Mui-focused': {
            color: '#7d5ffc',
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#7d5ffc',
        },
        '& .MuiFilledInput-underline:before': {
            borderBottomColor: '#53ddf0',
        },
        '& .MuiInputBase-input': {
            color: '#53ddf0',
        }
    },
    button: {
        margin: '0',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
    }
};



export default styles;

