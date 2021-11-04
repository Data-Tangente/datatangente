import React from 'react';
import {Typography, Grid, Dialog, DialogContent, DialogTitle} from '@material-ui/core';
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
                <Grid container justifyContent="space-between" alignItems="center" className="dialog-header-title">
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