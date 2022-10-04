import { gql } from "@apollo/client";
import { getApolloClient } from "../../lib/apollo-client";

export const dateFormat = (date, lang) => {
    let locale = 'EN';
    switch(lang) {
        case 'ES':
            locale = 'es-es';
            break;
        case 'EN':
            locale = 'en';
            break;
        default:
            break;
    }
    const newDate = new Date(date);
    const formattedDate = newDate.getDate() + " " + newDate.toLocaleString(locale, {month: 'long'}) + " " + newDate.getFullYear();
    return formattedDate;
}

export const getCurrentLangId = (locale) => {
    let id = 10;
    switch(locale) {
        case 'en':
            id = 10;
            break;
        case 'es':
            id = 9;
            break;
        default:
            break;
    }
    return id
}

export const getPostsData = async (locale) => {
    const language = locale.toUpperCase();
    const apolloClient = getApolloClient();
    const data = await apolloClient.query({
        query: gql`
        query posts($language: LanguageCodeFilterEnum!) {
            posts(where: {language: $language}) {
              edges {
                node {
                  id
                  excerpt(format: RENDERED)
                  title(format: RENDERED)
                  slug
                  language {
                    code
                    locale
                  }
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  content
                  date
                  tags {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
            generalSettings {
              title
              description
            }
          }
        `,
        variables: {
          language,

        },
    });

    let posts = data?.data.posts.edges.map(({ node }) => node).map((post) => {
        return {
            ...post,
            language,
            path: `/posts/${post.slug}`,
        };
    });

    posts.forEach(post => {
      post.tag_name = post.tags.edges.map(({node}) => node).map(({name}) => name);
      post.banner_img = post.featuredImage.node.sourceUrl;
    });

    const page = {
        ...data?.data.generalSettings,
    };

    return {
        posts, page
    }
}

export const getPostData = async (locale, params) => {
    const { posts } = params;
    const language = locale.toUpperCase();
    const apolloClient = getApolloClient();
    const data = await apolloClient.query({
        query: gql`
        query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
            postBy(slug: $slug) {
              id
              title(format: RENDERED)
              slug
              content
              date
              tags {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
              translation(language: $language) {
                id
                title(format: RENDERED)
                slug
                content
                date
                tags {
                  edges {
                    node {
                      name
                    }
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                language {
                  code
                  locale
                }
              }
            }
            generalSettings {
              title
            }
          }
        `,
        variables: {
          slug: posts,
          language,
        },
    });

    let post = {...(data?.data.postBy || {})};
    post.tag_name = post.tags.edges.map(({node}) => node).map(({name}) => name);
    post.banner_img = post.featuredImage.node.sourceUrl;
    post.translation = {...data?.data.postBy.translation};
    post.translation.tag_name = post.translation.tags.edges.map(({node}) => node).map(({name}) => name);
    post.translation.banner_img = post.translation.featuredImage.node.sourceUrl;

    const site = {
      ...data?.data.generalSettings,
    };

    return {
        post,
        language,
        path: `/posts/${post.slug}`,
        site,
    };
}

export const getStaticData = async (locales) => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node);
  const paths = posts.map(({ slug }) => {
    return {
      params: {
        posts: slug,
      },
    };
  });

  return {
    paths: [
      // ...paths,
      ...paths.flatMap((path) => {
        return locales.map((locale) => {
          return {
            ...path,
            locale,
          };
        });
      }),
    ],
    fallback: "blocking",
    // paths: [],
  };
}

export const tempNavTranslation = (locale, value) => {
  const data = {
    // change to "namespace" in case properties collide.
      es: {
          "home": "Inicio",
          "about": "Nostros",
          "solutions": "Soluciones",
          "statistics": "Estadísticas",
          "posts": "Publicaciones",
          "contact": "Contacto",
          "analysisBody": "Soluciones y plataformas acorde a las necesidades de nuestros clientes",
          "softwareBody": "Visualice nuestra línea de proceso",
          "processBody": "Plataformas y programas personalizadas para nuestros clientes",
          "analysis": "ANÁLISIS DE DATA",
          "softwareDev": "DESARROLLO DE SOFTWARE",
          "processLine": "NUESTRA LÍNEA DE PROCESO",
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
          "terms": "Condiciones de uso",
          "privacy": "Privacidad"
      },
      en: {
          "home": "Home",
          "about": "About Us",
          "solutions": "Solutions",
          "statistics": "Statistics",
          "posts": "Posts",
          "contact": "Contact",
          "analysisBody": "Solutions and platforms according to your needs",
          "softwareBody": "Check out our process line",
          "processBody": "Custom platforms and softwares",
          "analysis": "DATA ANALYSIS",
          "softwareDev": "SOFTWARE DEVELOPMENT",
          "processLine": "OUR PROCESS LINE",
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
          "terms": "Terms of use",
          "privacy": "Privacy"
      }
  }
  return data[locale][value];
}