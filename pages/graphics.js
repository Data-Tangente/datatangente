import {Typography, Grid } from '@material-ui/core';

function Graphics() {
    return(
        <Grid className="about-container max-width--" container style={{width:'100%', textAlign:'center', margin:'0 auto'}}>
            <iframe 
                src="https://app.powerbi.com/view?r=eyJrIjoiZDJkM2IwNDItYjM0My00ZjA1LTg1Y2ItYmUwNWViNjRkZDIyIiwidCI6Ijg3M2FiNjNmLWUxNTQtNGQ0OC04ZTI5LTA5MTA4NmUwMTg1NSIsImMiOjF9" 
                title="description"
                style={{width: '100%', height:'1100px'}}
            ></iframe>
        </Grid>
    );
}

export default Graphics;