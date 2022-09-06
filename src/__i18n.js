import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Languagedetector from "i18next-browser-languagedetector";
// import Backend from 'i18next-http-backend';

i18next
.use(initReactI18next)
.use(Languagedetector)
// .use(Backend)
.init({
    debug: true,
    fallbackLng: 'en',
    resources: {
        es: {
            translation: {
                home: {
                    divisions: {
                        solutions: 'SOLUCIONES',
                        // solutions: `<span className="division-text" style={{fontWeight:700}}>SOLUCIONES&nbsp;</span>`,
                        needs: 'ACORDE A TUS NECESIDADES',
                        // needs: `<span className="division-text body" style={{fontWeight:300}}>ACORDE A TUS NECESIDADES</span>`,
                        trusted: 'HAN CONFIADO',
                        work: 'EN NUESTRO TRABAJO',
                        posts: 'PUBLICACIONES',
                        recent: 'RECIENTES',
                    },
                    solutions: {
                        analysis: 'ANÁLISIS DE DATOS',
                        development: 'DESARROLLO DE SOFTWARE',
                        process: 'LÍNEA DE PROCESO',
                    },
                    subscribe: {
                        subscribe: "SUSCRÍBETE",
                        news: "A NUESTRO BOLETÍN",
                        keepUp: "Mantente al tanto de las últimas noticias.",
                    },
                    fields: {
                        name: "Nombre",
                        email: "Correo electrónico",
                        org: "Empresa",
                        position: "Cargo en la empresa",
                        phone: "Número telefónico",
                        hearAbout: "¿Cómo escuchaste de nosotros?",
                        msg: "¿Cómo podemos ayudarte?",
                        placeholderWrite: "Escriba su respuesta...",
                        placeholderOrg: "Ej: MINERD",
                        placeholderPositon: "Ej: Reclutador",
                        placeholderName: "Ej: María Perez Sánchez",
                        placeholderEmail: "Ej: mi_correo@dominio.com",
                    },
                    buttons: {
                        subscribe: "Suscribirme",
                        sendMsg: "Enviar Mensaje",
                    },

                },
                nav: {
                    home: 'Inicio',
                    about: 'Nostros',
                    solutions: 'Soluciones',
                    statistics: 'Estadísticas',
                    posts: 'Publicaciones',
                    contact: 'Contacto',
                    analysisBody: 'Soluciones y plataformas acorde a las necesidades de nuestros clientes',
                    softwareBody: 'Visualice nuestra línea de proceso',
                    processBody: 'Plataformas y programas personalizadas para nuestros clientes',
                },
                footer: {
                    address: "C/Mercedes echenique #9 Edificio Rivera del sur, Santo Domingo Mirador sur",
                    we: "Nostros",
                    aboutUs: "Sobre Nosotros",
                    mission: "Misión",
                    vision: "Visión",
                    values: "valores",
                    home: "Inicio",
                    suscribe: "Suscribirse al boletín",
                    solutions: "Soluciones",
                    analysis: "Análisis de dato",
                    development: "Desarrollo de software",
                    process: "Línea de proceso",
                    posts: "Publicaciones",
                    terms: "Condiciones de uso",
                    privacy: "Privacidad"
                },
                aboutUs: {
                    title: "¡CONÓCENOS UN POCO MÁS!",
                    dt1: `es una empresa de servicios tecnológicos y análisis de la información, 
                    cuyo principal objetivo es ayudar a sus socios y clientes a alcanzar sus objetivos propuestos.`,
                    dt2: `Compuesto por un equipo de economistas, matemáticos y programadores con mas de 5 años de experiencia, 
                    tratamos de que nuestros clientes sean cada vez mas productivos a través de sus procesos y el análisis de la 
                    información desde el punto de vista correcto.`,
                    mission: "MISIÓN",
                    missionDesc: `Proporcionar soluciones escalables e innovadoras, con la finalidad de 
                    eficientizar procesos y mejorar la toma de decisiones.`,
                    vision: "VISIÓN",
                    visionDesc: `Acompanar a nuestros clientes a alcanzar sus objetivos, mejorando sus procesos y 
                    calidad de la informacion. Ser un referente en el analisis de la informacion y nuevas tecnologia.`,
                },
                solutions: {
                    title: 'SERVICIOS Y PRODUCTOS ACORDE A TUS NECESIDADES',
                    title2: 'SERVICIOS Y PRODUCTOS',
                    subTitle: 'Mejores procesos, mejores decisiones. Productos hechos a la medida para nuestros clientes.',
                    analysis: "ANÁLISIS DE DATA",
                    analysisQuote: `"LO QUE SE MIDE, SE CONTROLA"`,
                    analysisBody: `Implementamos soluciones y plataformas las cuales ayudan a nuestros clientes a analizar de manera mas 
                    detallada su informacion, aumentando la calidad en la toma de decisiones.`,
                    dataAnlysis: "Análisis de datos",
                    certified: "Estamos certificados en:",
                    dataBase: "Base de datos",
                    workWith: "Trabajamos con:",
                    softwareDev: "DESARROLLO DE SOFTWARE",
                    softwareQuote: `"EN LA ERA EN LA QUE VIVIMOS, LAS EMPRESAS QUE NO SE ADAPTEN ESTÁN DESTINADAS AL FRACASO"`,
                    softwareBody: "Creamos plataformas y programas personalizadas para nuestros clientes con el fin de eficientizar procesos y reducir costos.",
                    techs: "Tecnologías",
                    processLine: "NUESTRA LÍNEA DE PROCESO",
                },
                posts: {
                    title: "DE TU INTERÉS, ACTUALIZADO",
                    filter: "FILTRO",
                    of: "de",
                    accept: "ACEPTAR",
                    reset: "REINICIAR",
                    filterSelect: "Selecciona las publicaciones que quieres ver",
                },
                contact: {
                    title: "CONTÁCTENOS",
                    messageTitle: "DÉJENOS UN MENSAJE",
                    fieldNameTitle: "Nombre completo",
                    fieldNamePlaceholder: "Ej: Juan Pérez Sánchez",

                    fieldEmailTitle: "Correo electrónico",
                    fieldEmailPlaceholder: "Ej: mi_correo_001@dominio.com",

                    fieldOrgTitle: "Nombre de la compañía",
                    fieldOrgPlaceholder: "Ej: MINERD",

                    fieldOrgPositonTitle: "Cargo en la compañía",
                    fieldOrgPositonPlaceholder: "Ej: Encargado de Negociación",

                    fieldPhoneNumberTitle: "Número telefónico",
                    fieldNamePlacehPlaceholder: "Ej: 809-000-0000",

                    fieldHearOfUsTitle: "¿Cómo escuchaste de nosotros?",
                    fieldHearOfUsPlaceholder: "Escriba su respuesta...",

                    fieldMsgTitle: "¿Cómo podemos ayudarte?",
                    fieldMsgPlaceholder: "Escriba su respuesta...",
                    sendMsg: "Enviar Mensaje",
                    success: "¡Éxito!",
                    successBody: "Su mensaje ha sido enviado correctamente.",
                    error: "Oops...",
                    errorBody: "No se pudo enviar correctamente el mensaje, favor intentar nuevamente.",

                }
            }
        },
        en: {
            translation: {
                home: {
                    divisions: {
                        solutions: 'SOLUTIONS',
                        // solutions: `<span className="division-text" style={{fontWeight:700}}>SOLUCIONES&nbsp;</span>`,
                        needs: 'ACCORDING TO YOUR NEEDS',
                        // needs: `<span className="division-text body" style={{fontWeight:300}}>ACORDE A TUS NECESIDADES</span>`,
                        trusted: 'TRUSTED',
                        work: 'OUR WORK',
                        posts: 'POSTS',
                        recent: 'RECENT',
                    },
                    solutions: {
                        analysis: 'DATA ANALYSIS',
                        development: 'SOFTWARE DEVELOPMENT',
                        process: 'PROCESS LINE',
                    },
                    subscribe: {
                        subscribe: "SUBSCRIBE",
                        news: "TO OUR NEWS LETTER",
                        keepUp: "Stay updated with the latest",
                    },
                    fields: {
                        name: "Name",
                        email: "Email",
                        org: "Company",
                        position: "Position in company",
                        phone: "Phone number",
                        hearAbout: "How did you hear about us?",
                        msg: "How can we assist?",
                        placeholderWrite: "Type your answer...",
                        placeholderOrg: "eg: Complex Stuff Inc.",
                        placeholderPositon: "eg: Recruiter",
                        placeholderName: "eg: John Greenwich",
                        placeholderEmail: "eg: my_email@domain.com",
                    },
                    buttons: {
                        subscribe: "Subscribe",
                        sendMsg: "Send message",
                    },
                },
                nav: {
                    home: 'Home',
                    about: 'About Us',
                    solutions: 'Solutions',
                    statistics: 'Statistics',
                    posts: 'Posts',
                    contact: 'Contact',
                    analysisBody: 'Solutions and platforms according to your needs',
                    softwareBody: 'Check out our process line',
                    processBody: 'Custom platforms and softwares',
                },
                footer: {
                    address: "Mercedes echenique street #9, Rivera del Sur building, Santo Domingo Mirador sur",
                    we: "Us",
                    aboutUs: "About us",
                    mission: "Mission",
                    vision: "Vision",
                    values: "Values",
                    home: "Home",
                    suscribe: "Subscribe to the newsletter",
                    solutions: "Solutions",
                    analysis: "Data analysis",
                    development: "Software Development",
                    process: "Process line",
                    posts: "Posts",
                    terms: "Terms of use",
                    privacy: "Privacy"
                },
                aboutUs: {
                    title: "GET TO KNOW US!",
                    dt1: `is a technology services and information analysis company, whose main objective 
                    is to help its partners and clients achieve their proposed objectives.`,
                    dt2: `Composed of a team of economists, mathematicians and programmers with more 
                    than 5 years of experience, we try to make our clients more and more productive through 
                    their processes and the analysis of information from the correct point of view.`,
                    mission: "MISSION",
                    missionDesc: `Provide scalable and innovative solutions, 
                    in order to streamline processes and improve decision-making.`,
                    vision: "VISION",
                    visionDesc: `Accompany our clients to achieve their objectives, improving 
                    their processes and quality of information. To be a reference in the analysis of information and new technologies.`,
                },
                solutions: {
                    title: 'SERVICES AND PRODUCTS ACCORDING TO YOUR NEEDS',
                    title2: 'SERVICES AND PRODUCTS',
                    subTitle: 'Better processes, better decisions. Products made to fit our clients.',
                    analysis: "DATA ANALYSIS",
                    analysisQuote: `"WHAT IS MEASURED, CAN BE MANAGED"`,
                    analysisBody: ` We implement solutions and platforms which help our clients to 
                    analyze their information in more detail, increasing the quality of decision making`,
                    dataAnlysis: "Data Analysis",
                    certified: "We are certified in:",
                    dataBase: "Database",
                    workWith: "We work with:",
                    softwareDev: "SOFTWARE DEVELOPMENT",
                    softwareQuote: `"IN THE AGE WE LIVE IN, COMPANIES THAT DON'T ADAPT ARE DOOMED TO FAIL"`,
                    softwareBody: "We create customized platforms and programs for our clients in order to streamline processes and reduce costs.",
                    techs: "Technologies",
                    processLine: "OUR PROCESS LINE",
                },
                posts: {
                    title: "OF YOUR INTEREST, UPDATED",
                    filter: "FILTER",
                    of: "of",
                    accept: "ACCEPT",
                    reset: "RESET",
                    filterSelect: "Select the posts you want to see",
                },
                contact: {
                    position: "Position in company",
                    phone: "Phone number",
                    hearAbout: "How did you hear about us?",
                    msg: "How can we assist?",
                    placeholderWrite: "Type your answer...",
                    placeholderOrg: "eg: Complex Stuff Inc.",
                    placeholderPositon: "eg: Recruiter",
                    placeholderName: "eg: John Greenwich",
                    placeholderEmail: "eg: my_email@domain.com",

                    title: "CONTACT US",
                    messageTitle: "LEAVE US A MESSAGE",
                    fieldNameTitle: "Full Name",
                    fieldNamePlaceholder: "eg: Michael Jackson",

                    fieldEmailTitle: "Email",
                    fieldEmailPlaceholder: "eg: my_email@domain.com",

                    fieldOrgTitle: "Company Name",
                    fieldOrgPlaceholder: "eg: Complex Stuff Inc.",

                    fieldOrgPositonTitle: "Position in company",
                    fieldOrgPositonPlaceholder: "eg: Recruiter",

                    fieldPhoneNumberTitle: "Phone number",
                    fieldNamePlacehPlaceholder: "eg: 534-999-9999",

                    fieldHearOfUsTitle: "How did you hear about us?",
                    fieldHearOfUsPlaceholder: "Type your answer...",

                    fieldMsgTitle: "How can we assist?",
                    fieldMsgPlaceholder: "Type your answer...",
                    sendMsg: "Send message",
                    success: "Success!",
                    successBody: "Your message has been sent successfully.",
                    error: "Whoops...",
                    errorBody: "The message could not be sent correctly, please try again.",

                }
            }
        }
    }
})