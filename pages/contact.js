import React, { useState, } from 'react';
import {Typography, Grid } from '@material-ui/core';
import SubsDivision from  '../components/SubscribeDivision';
import CircularProgressLoading from '../components/Loading';
import SimpleDialog from '../components/SimpleDialog';
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import emailjs from 'emailjs-com';


function Contact() {
    const defaultVal = {
        name: '',
        email: '',
        org: '',
        msg: '',
    }
    const [dialog, setDialog] = useState('');
    const [loading, setLoading] = useState(false);
    const [formInfo, setFormInfo] = useState(defaultVal);
    const [error, setError] = useState(false);
    const [errorList, setErrorList] = useState({});
    const required = ['name', 'email', 'msg'];
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
        const templateId = 'template_iv7nt41';
        const info = {
            from_name: formInfo.name,
            message: formInfo.msg,
            from_email: formInfo.email,
            from_org: (formInfo.org && `De la empresa: ${formInfo.org}`) || '',
        }
        sendFeedback(templateId, info);
    }

    const sendFeedback = (template, vars) => {
        setLoading(true);
        emailjs.send('service_fncue1a', template, vars, 'ON2z6ecngBZ9QoCwL')
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
        <>
            <Grid className="contact-container" container style={{width:'100%'}}>
                <div className="contact-title">
                    <Grid className="contact-title-text-container" container item>
                        <Typography  
                            variant="h3"
                            className="contact-title-text"
                        >
                            <span>
                                CONTÁCTENOS
                            </span>
                        </Typography>
                    </Grid>

                    <Grid container className="contact-info-container">
                        <div className="address-container">
                            <div className="address">
                                C/ mercedes echenique #9 Edificio Rivera del sur, Santo Domingo Mirador sur
                            </div>
                            <div className="phone-number">
                                829-876-1754
                            </div>
                        </div>

                        <div className="social-media-container">
                            <span className="social-icon-container">
                                <a href="https://www.instagram.com/datatangente/" target="_blank">
                                    <Icon icon={faInstagram}/>
                                </a>
                            </span>
                            <span className="social-icon-container">
                                <a href="https://www.linkedin.com/company/data-tangente" target="_blank">
                                    <Icon icon={faLinkedin} />
                                </a>
                            </span>
                        </div>
                    </Grid>

                    <Grid container className="message-container">
                        <form className="message-form-container">
                            <Typography  
                                variant="h6"
                                className="message-title-text"
                            >
                                <span>
                                    DÉJENOS UN MENSAJE
                                </span>
                            </Typography>
                            <div className="message-form-inputs-container" style={{display:'flex', justifyContent:'space-between'}}>
                                <div className="contact-input-container" >
                                    <input 
                                        name="name" 
                                        type="text" required 
                                        className={"input-subscribe "+(errorList.name && 'error' || '')} 
                                        placeholder="Nombre (*)" 
                                        onChange={handleChangeInput.bind(this, 'name')} 
                                        value={formInfo.name}
                                    />
                                    <span className={"error-msg "+(errorList.name && 'show' || '')}>ESTE CAMPO ES REQUERIDO</span>
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
                                    <span className={"error-msg "+(errorList.email && 'show' || '')}>INTRODUZCA UN EMAIL VÁLIDO. Ej: correo@dominio.com</span>
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
                            </div>
                            <div className="message-form-message-container">
                                <textarea
                                    type="text"
                                    required
                                    className={"input-subscribe "+(errorList.msg && 'error' || '')+" message"}
                                    name="message" 
                                    rows="10" 
                                    placeholder="Mensaje (*)" 
                                    style={{resize:'none'}}
                                    onChange={handleChangeInput.bind(this, 'msg')}
                                    value={formInfo.msg}
                                />
                                <span style={{textAlign:'left'}} className={"error-msg "+(errorList.msg && 'show' || '')}>ESTE CAMPO ES REQUERIDO</span>
                                {
                                    loading ?
                                    <div className="send-message-btn-container">
                                        <div className="button-subscribe-loading" style={{display:'flex', justifyContent:'center'}}>
                                            <CircularProgressLoading />
                                        </div>
                                    </div>
                                    :
                                    <div className="send-message-btn-container" onClick={handleSubmitForm}>
                                        <label className="button-subscribe" htmlFor="submit-form">
                                            <span>Enviar Mensaje</span>
                                        </label>
                                    </div>
                                }
                            </div>
                        </form>
                    </Grid>
                </div>
            </Grid>
            {
                dialog === 'success' && 
                    <SimpleDialog 
                        open={true}
                        title="¡Éxito!"
                        response="Su mensaje ha sido enviado correctamente."
                        setDialog={setDialog}
                        toggleDialog={toggleDialog}
                    />
            }
            {
                dialog === 'failure' && 
                    <SimpleDialog 
                        open={true}
                        title="Oops..."
                        response="No se pudo enviar correctamente el mensaje, favor intentar nuevamente."
                        setDialog={setDialog}
                        toggleDialog={toggleDialog}
                    />
            }
            <SubsDivision />
        </>
    );
}

export default Contact;