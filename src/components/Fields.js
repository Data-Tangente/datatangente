import { Typography, Grid } from '@material-ui/core';
import NumberFormat from 'react-number-format';

export function TextField(props) {
    return(
        <div className="contact-input-container">
            <Typography variant="subtitle1">
                {props.label}
            </Typography>
            <input 
                // {...props}
                name={props.name} 
                type={props.type}
                required={props.required}
                className={props.inputClass}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
            <span className={props.errorClass}>{props.errorText || "ESTE CAMPO ES REQUERIDO"}</span>
        </div>
    )
}

export function TextAreaField(props) {
    return(
        <div className="message-form-message-container">
            <Typography variant="subtitle1">
                {props.label}
            </Typography>
            <textarea
                name={props.name} 
                type={props.type}
                required={props.required}
                className={props.inputClass}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                rows={props.row || 5}
                style={{...props.style, resize:'none'}}
            />
            <span className={props.errorClass}>{props.errorText || "ESTE CAMPO ES REQUERIDO"}</span>
        </div>
    )
}

export function NumericField(props) {
    return(
        <div className="contact-input-container">
            <Typography variant="subtitle1">
                {props.label}
            </Typography>
            <NumberFormat
                name={props.name} 
                style={props.disabled ? {...props.style, backgroundColor:'#f5f5f5'} : props.style}
                value={props.value}
                className={props.inputClass || "fields"}
                variant={props.fieldVariant || "outlined"}
                readOnly={props.readOnly}
                disabled={props.disabled}
                required={props.required}
                placeholder={props.placeholder}
                margin={props.margin || "dense"}
                thousandSeparator={props.thousandSeparator}
                decimalScale={props.decimalScale}
                fixedDecimalScale={props.fixedDecimalScale}
                error={props.error}
                prefix={props.prefix}
                suffix={props.suffix}
                format={props.format}
                mask={props.mask}
                allowEmptyFormatting={props.allowEmptyFormatting}
                inputMode="numeric"
                allowNegative={false}
                onValueChange={props.onChange}
                isAllowed={props.isAllowed}
                allowLeadingZeros={props.allowLeadingZeros}
            />
            <span className={props.errorClass}>{props.errorText || "ESTE CAMPO ES REQUERIDO"}</span>
        </div>
    )
}