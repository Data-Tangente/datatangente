import React, { useState, } from 'react';
import {Typography, Grid,} from '@material-ui/core';
import CircularProgressLoading from './Loading';
import SimpleDialog from './SimpleDialog';
import emailjs from 'emailjs-com';

function SubsDivision(props) {

    const defaultVal = {
        name: '',
        email: '',
        org: '',
    }
    const [dialog, setDialog] = useState('');
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(defaultVal);
    const [error, setError] = useState(false);
    const [errorList, setErrorList] = useState({});
    const required = ['name', 'email'];
    const emailRegx = // email reg expression
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleChangeInput = (type, event) => {
        setErrorList({...errorList, [type]: false});
        setFormInfo({...formInfo, [type]: event.target.value});
    }

    const validateForm = () => {
        let errors = {}
        let hasError = false;
        required.forEach(item => {
            let currentErr = false;
            switch(item) {
                case 'email':
                    currentErr = !Boolean(emailRegx.test(String(formInfo[item]).toLocaleLowerCase()));
                    break;
                default:
                    currentErr = !Boolean(formInfo[item].trim());
                    break;

            }
            errors[item] = currentErr;
            if(!hasError && currentErr) {
                hasError = currentErr;
            }
        });
        setError(hasError);
        setErrorList({...errors});
        return hasError;
    }

    const handleSubmitForm = () => {
        if(validateForm()) {
            return;
        }
        const templateId = 'template_dllgj5x';
        const info = {
            from_name: formInfo.name,
            from_email: formInfo.email,
            from_org: (formInfo.org && `De la empresa: ${formInfo.org}`) || '',
        }
        sendFeedback(templateId, info);
    }

    const sendFeedback = (template, vars) => {
        setLoading(true);
        emailjs.send('service_8cbo1uj', template, vars, 'user_2aK50W4XYh7luaX6YBTxJ')
        .then(() => {
            toggleDialog('success');
            setFormInfo({...defaultVal});
            setLoading(false);
        }).catch(() => {
            toggleDialog('failure');
            setLoading(false);
        });
    }

    const toggleDialog = (dialog) => {
        setDialog(dialog);
    }

    return(
        <Grid 
            container
            className="subscribe-division-container"
        >
            <Typography
                variant="h4"
                className="subscribe-title-text"
            >
                <span style={{fontWeight:700}}>SUSCRÍBETE&nbsp;</span>
                <span style={{fontWeight:300}}>A NUESTRO BOLETÍN</span>
            </Typography>
            <Typography
                variant="subtitle1"
                style={{color:'#fff', width:'100%'}}
                className="subscribe-title-text-body"
            >
                <span>
                    Mantente al tanto de las últimas noticias.
                </span>
            </Typography>
            <Grid container className="subscribe-input-form">
                {/* <input className="input-subscribe" placeholder="Nombre" />
                <input className="input-subscribe" placeholder="Email" />
                <input className="input-subscribe" placeholder="Empresa" /> */}

                <div className="contact-input-container" >
                    <input 
                        name="name" 
                        type="text" required 
                        className={"input-subscribe "+(errorList.name && 'error' || '')} 
                        placeholder="Nombre (*)" 
                        onChange={handleChangeInput.bind(this, 'name')} 
                        value={formInfo.name}
                    />
                    <span className={"error-msg-subs "+(errorList.name && 'show' || '')}>ESTE CAMPO ES REQUERIDO</span>
                </div>
                <div className="contact-input-container">
                    <input
                        type="email"
                        name="email"
                        required 
                        className={"input-subscribe "+(errorList.email && 'error' || '')}
                        placeholder="Email (*)" 
                        onChange={handleChangeInput.bind(this, 'email')}
                        value={formInfo.email}
                    />
                    <span className={"error-msg-subs "+(errorList.email && 'show' || '')}>INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com</span>
                </div>
                <div className="contact-input-container">
                    <input 
                        type="text" 
                        className={"input-subscribe"} 
                        placeholder="Empresa" 
                        name="organization" 
                        onChange={handleChangeInput.bind(this, 'org')}
                        value={formInfo.org}
                    />
                </div>

                {/* <div className="button-subscribe">
                    <span>Suscribirme</span>
                </div> */}

                {
                    loading ?
                        <div className="button-subscribe-loading" style={{display:'flex', justifyContent:'center'}}>
                            <CircularProgressLoading />
                        </div>
                    :
                    <div className="button-subscribe" onClick={handleSubmitForm}>
                        <span>Suscribirme</span>
                    </div>
                }
            </Grid>
            {
                dialog === 'success' && 
                    <SimpleDialog 
                        open={true}
                        title="¡Éxito!"
                        response="Se ha subscrito correctamente."
                        setDialog={setDialog}
                        toggleDialog={toggleDialog}
                    />
            }
            {
                dialog === 'failure' && 
                    <SimpleDialog 
                        open={true}
                        title="Oops..."
                        response="La subscripción no pudo ser completada correctamente, favor intentar nuevamente."
                        setDialog={setDialog}
                        toggleDialog={toggleDialog}
                    />
            }
        </Grid>
    );
}

export default SubsDivision;