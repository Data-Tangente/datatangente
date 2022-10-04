import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Languagedetector from "i18next-browser-languagedetector";

i18next
.use(initReactI18next)
.use(Languagedetector)
.init({
    debug: false,
    fallbackLng: 'en',
    resources: {
        es: {
            translation: {
                "nav": {
                    "home": "Inicio",
                    "about": "Nostros",
                    "solutions": "Soluciones",
                    "statistics": "Estadísticas",
                    "posts": "Publicaciones",
                    "contact": "Contacto",
                    "analysisBody": "Soluciones y plataformas acorde a las necesidades de nuestros clientes",
                    "softwareBody": "Visualice nuestra línea de proceso",
                    "processBody": "Plataformas y programas personalizadas para nuestros clientes"
                  },
                  "footer": {
                    "address": "C/ Arístides García Mella 23-27, Santo Domingo",
                    "we": "Nostros",
                    "aboutUs": "Sobre Nosotros",
                    "mission": "Misión",
                    "vision": "Visión",
                    "values": "valores",
                    "home": "Inicio",
                    "suscribe": "Suscribirse al boletín",
                    "solutions": "Soluciones",
                    "analysis": "Análisis de dato",
                    "development": "Desarrollo de software",
                    "process": "Línea de proceso",
                    "posts": "Publicaciones",
                    "terms": "Condiciones de uso",
                    "privacy": "Privacidad"
                  },
                  "solutions": {
                    "title": "SERVICIOS Y PRODUCTOS ACORDE A TUS NECESIDADES",
                    "title2": "SERVICIOS Y PRODUCTOS",
                    "subTitle": "Mejores procesos, mejores decisiones. Productos hechos a la medida para nuestros clientes.",
                    "analysis": "ANÁLISIS DE DATA",
                    "analysisQuote": "\"LO QUE SE MIDE, SE CONTROLA\"",
                    "analysisBody": "Implementamos soluciones y plataformas las cuales ayudan a nuestros clientes a analizar de manera mas detallada su informacion, aumentando la calidad en la toma de decisiones.",
                    "dataAnlysis": "Análisis de datos",
                    "certified": "Estamos certificados en:",
                    "dataBase": "Base de datos",
                    "workWith": "Trabajamos con:",
                    "softwareDev": "DESARROLLO DE SOFTWARE",
                    "softwareQuote": "\"EN LA ERA EN LA QUE VIVIMOS, LAS EMPRESAS QUE NO SE ADAPTEN ESTÁN DESTINADAS AL FRACASO\"",
                    "softwareBody": "Creamos plataformas y programas personalizadas para nuestros clientes con el fin de eficientizar procesos y reducir costos.",
                    "techs": "Tecnologías",
                    "processLine": "NUESTRA LÍNEA DE PROCESO"
                  },
                  
            }
        },
        en: {
            translation: {
                "footer": {
                    "address": "Arístides García Mella Street, #23-27, Santo Domingo",
                    "we": "Us",
                    "aboutUs": "About us",
                    "mission": "Mission",
                    "vision": "Vision",
                    "values": "Values",
                    "home": "Home",
                    "suscribe": "Subscribe to the newsletter",
                    "solutions": "Solutions",
                    "analysis": "Data analysis",
                    "development": "Software Development",
                    "process": "Process line",
                    "posts": "Posts",
                    "terms": "Terms of use",
                    "privacy": "Privacy"
                },
                "nav": {
                    "home": "Home",
                    "about": "About Us",
                    "solutions": "Solutions",
                    "statistics": "Statistics",
                    "posts": "Posts",
                    "contact": "Contact",
                    "analysisBody": "Solutions and platforms according to your needs",
                    "softwareBody": "Check out our process line",
                    "processBody": "Custom platforms and softwares"
                },
                "solutions": {
                    "title": "SERVICES AND PRODUCTS ACCORDING TO YOUR NEEDS",
                    "title2": "SERVICES AND PRODUCTS",
                    "subTitle": "Better processes, better decisions. Products made to fit our clients.",
                    "analysis": "DATA ANALYSIS",
                    "analysisQuote": "\"WHAT IS MEASURED, CAN BE MANAGED\"",
                    "analysisBody": "We implement solutions and platforms which help our clients to analyze their information in more detail, increasing the quality of decision making",
                    "dataAnlysis": "Data Analysis",
                    "certified": "We are certified in:",
                    "dataBase": "Database",
                    "workWith": "We work with:",
                    "softwareDev": "SOFTWARE DEVELOPMENT",
                    "softwareQuote": "\"IN THE AGE WE LIVE IN, COMPANIES THAT DON'T ADAPT ARE DOOMED TO FAIL\"",
                    "softwareBody": "We create customized platforms and programs for our clients in order to streamline processes and reduce costs.",
                    "techs": "Technologies",
                    "processLine": "OUR PROCESS LINE"
                },
            }
        }
    }
})