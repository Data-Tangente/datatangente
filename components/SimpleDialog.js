import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';
import Dialog from '@bit/mui-org.material-ui.dialog';
import DialogContent from '@bit/mui-org.material-ui.dialog-content';
// import DialogActions from '@bit/mui-org.material-ui.dialog-actions';
// import DialogContentText from '@bit/mui-org.material-ui.dialog-content-text';
import DialogTitle from '@bit/mui-org.material-ui.dialog-title';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SimpleDialog(props) {
    return(
        <Dialog
            fullWidth
            maxWidth="sm"
            keepMounted
            disableBackdropClick={false}
            style={{overflow: 'hidden', zIndex:10000}}
            onClose={props.toggleDialog.bind(this, undefined)}
            className="dialog-container"
            open={props.open}
        >
            <DialogTitle className="dialog-header">
                <Grid container justify="space-between" alignItems="center" className="dialog-header-title">
                    <Typography component={'span'} variant="h4" className="" style={{color: '#f05638'}}>
                        {props.title}
                    </Typography>

                    <Typography 
                        component={'span'} 
                        variant="h4" 
                        onClick={props.toggleDialog.bind(this, undefined)} 
                        style={{color: '#595959', cursor:'pointer'}}
                    >
                        <Icon icon={faTimes}/>
                    </Typography>
                </Grid>
                <div className="dialog-title-bar">{/** */}</div>
            </DialogTitle>
            <DialogContent className="dialog-tags-container" style={{margin:'1rem 0'}}>
                <Typography component={'span'} variant="h6" style={{color: '#424242'}}>
                        {props.response}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}