import Typography from '@bit/mui-org.material-ui.typography';
import Grid from '@bit/mui-org.material-ui.grid';

function AboutUs() {
    return(
        <Grid className="about-container" container style={{width:'100%'}}>
            <div className="about-title">
                <Grid className="about-title-text-container" container item>
                    <Typography  
                        variant="h2"
                        className="about-title-text"
                    >
                        ¡CONÓCENOS UN POCO MÁS!
                        {/* ¿QUIÉNES SOMOS? */}
                    </Typography>
                    {/* <Typography 
                        variant="body1"
                        className="about-body-text"
                        style={{marginTop:15, color:'#fff'}}
                    >
                        <span>
                            Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh 
                            euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                            minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut 
                            aliquip ex ea commodo consequat.
                        </span>
                    </Typography> */}
                </Grid>
            </div>
            <div className="about-body-container">
                {/* <Typography 
                    variant="h3"
                    style={{margin:'5rem 0', color:'#f05638', letterSpacing:8, fontWeight:500, textAlign:'center'}}
                >
                    ¿QUIÉNES SOMOS?
                </Typography> */}

                <Typography  
                    variant="subtitle1"
                    style={{marginTop:'2rem', color:'#424242', fontWeight: 700, textAlign:'center', fontSize:'1.6rem'}}
                >
                    <span style={{color:'#f05638'}}>Data Tangente</span> es una empresa de servicios tecnológicos y análisis de la información, 
                    cuyo principal objetivo es ayudar a sus socios y clientes a alcanzar sus objetivos propuestos.
                </Typography>
                <Typography  
                    variant="subtitle1"
                    style={{marginTop:'2rem', color:'#424242', textAlign:'center', fontSize:'1.6rem'}}
                >
                    Compuesto por un equipo de economistas, matemáticos y programadores con mas de 5 años de experiencia, 
                    tratamos de que nuestros clientes sean cada vez mas productivos a través de sus procesos y el análisis de la 
                    información desde el punto de vista correcto.
                </Typography>

                <div className="border-gradient horizontal" style={{marginTop:'5rem'}}></div>
                <Grid container direction="row" justify="space-between" className="vision-mision-container">
                    <Grid item container style={{width:'45%'}} direction="column" justify="center" alignItems="center">
                        <img alt="vision-icon" className="about-mision" style={{paddingTop:'1rem'}} src="/assets/mision.png" />
                        <Typography  
                            variant="h4"
                            style={{color: '#f05638', letterSpacing: 4, fontWeight: 500, marginTop:'2rem'}}
                        >
                            MISIÓN
                        </Typography>
                        <Typography  
                            variant="body1"
                            style={{marginTop:'2rem', color:'#424242', textAlign:'center', fontSize:'1.6rem', height:'20rem'}}
                        >
                            Proporcionar soluciones escalables e innovadoras, con la finalidad de 
                            eficientizar procesos y mejorar la toma de decisiones.
                        </Typography>
                    </Grid>
                    <div className="border-gradient vertical"></div>
                    <Grid item container style={{width:'45%'}} direction="column" justify="center" alignItems="center">
                        <img alt="vision-icon" className="about-vision" style={{paddingTop:'1rem'}} src="/assets/vision.png" />
                        <Typography  
                            variant="h4"
                            style={{color: '#f05638', letterSpacing: 4, fontWeight: 500, marginTop:'2rem'}}
                        >
                            VISIÓN
                        </Typography>
                        <Typography  
                            variant="body1"
                            style={{marginTop:'2rem', color:'#424242', textAlign:'center', fontSize:'1.6rem', height:'20rem'}}
                        >
                            Acompanar a nuestros clientes a alcanzar sus objetivos, 
                            mejorando sus procesos y calidad de la informacion. 
                            Ser un referente en el analisis de la informacion y nuevas tecnologia.
                        </Typography>
                    </Grid>
                </Grid>
                <img alt="vision-icon" className="about-values-img" src="/assets/about_values.png" />
                <div className="border-gradient horizontal small" style={{marginTop:'5rem'}}></div>
                <img alt="vision-icon" className="about-values-img small" src="/assets/about_values_small.png" />
            </div>
        </Grid>
    );
}

export default AboutUs;