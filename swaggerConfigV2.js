const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '🏠 API Blog Agence Immobilière',
            version: '1.0.0',
            description: `
## Bienvenue sur l'API de l'Agence Immobilière

Cette documentation interactive vous permet de **consulter**, **créer**, **modifier** et **supprimer** des annonces immobilières connectées à Railway.

### 🚀 Fonctionnalités
- 📋 Lister toutes les annonces
- 🔍 Rechercher par mot-clé
- ➕ Ajouter une nouvelle annonce
- ✏️ Modifier une annonce existante
- 🗑️ Supprimer une annonce

### 🔗 Base de données
Connectée en temps réel à **Railway MySQL**.
            `,
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: '🖥️ Serveur local',
            },
            {
                url: 'https://votre-app.railway.app',
                description: '☁️ Serveur Railway (production)',
            }
        ],
        tags: [
            {
                name: 'Articles',
                description: '📦 Opérations sur les annonces immobilières',
            }
        ],
    },
    apis: ['./server.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const customCss = `
    /* ===== FONT ===== */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { font-family: 'Inter', sans-serif !important; }

    /* ===== FOND GÉNÉRAL ===== */
    body {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%) !important;
        min-height: 100vh;
    }

    .swagger-ui {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 20px;
    }

    /* ===== TOPBAR ===== */
    .swagger-ui .topbar {
        background: linear-gradient(90deg, #1d4ed8, #2563eb, #3b82f6) !important;
        padding: 14px 24px !important;
        box-shadow: 0 4px 20px rgba(37, 99, 235, 0.5) !important;
        border-bottom: 2px solid rgba(255,255,255,0.15) !important;
    }

    .swagger-ui .topbar-wrapper {
        justify-content: center !important;
    }

    .swagger-ui .topbar-wrapper .link::before {
        content: '🏠 Agence Immobilière API';
        color: white;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }

    .swagger-ui .topbar-wrapper img,
    .swagger-ui .topbar-wrapper svg {
        display: none !important;
    }

    /* ===== BLOC INFO ===== */
    .swagger-ui .information-container {
        background: rgba(255, 255, 255, 0.05) !important;
        border: 1px solid rgba(59, 130, 246, 0.3) !important;
        border-radius: 16px !important;
        padding: 30px !important;
        margin: 24px 0 !important;
        backdrop-filter: blur(10px) !important;
    }

    .swagger-ui .info .title {
        color: #93c5fd !important;
        font-size: 28px !important;
        font-weight: 700 !important;
    }

    .swagger-ui .info p,
    .swagger-ui .info li,
    .swagger-ui .info h3 {
        color: #cbd5e1 !important;
    }

    .swagger-ui .info .base-url {
        color: #60a5fa !important;
    }

    /* ===== SERVERS DROPDOWN ===== */
    .swagger-ui .scheme-container {
        background: rgba(255,255,255,0.04) !important;
        border: 1px solid rgba(59,130,246,0.2) !important;
        border-radius: 12px !important;
        padding: 16px 24px !important;
        margin-bottom: 20px !important;
    }

    .swagger-ui .servers > label {
        color: #93c5fd !important;
        font-weight: 600 !important;
    }

    .swagger-ui .servers select {
        background: #1e3a5f !important;
        color: #e2e8f0 !important;
        border: 1px solid #3b82f6 !important;
        border-radius: 8px !important;
        padding: 6px 12px !important;
    }

    /* ===== TAGS / SECTIONS ===== */
    .swagger-ui .opblock-tag {
        background: linear-gradient(90deg, rgba(29,78,216,0.3), rgba(59,130,246,0.1)) !important;
        border: 1px solid rgba(59,130,246,0.4) !important;
        border-radius: 12px !important;
        margin-bottom: 10px !important;
        padding: 12px 20px !important;
        color: #93c5fd !important;
        font-size: 17px !important;
        font-weight: 700 !important;
    }

    .swagger-ui .opblock-tag:hover {
        background: linear-gradient(90deg, rgba(29,78,216,0.5), rgba(59,130,246,0.2)) !important;
    }

    /* ===== BLOCS DE ROUTES ===== */
    .swagger-ui .opblock {
        border-radius: 12px !important;
        margin-bottom: 10px !important;
        border: none !important;
        overflow: hidden !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    .swagger-ui .opblock:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(0,0,0,0.4) !important;
    }

    /* GET - Bleu */
    .swagger-ui .opblock.opblock-get {
        background: linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05)) !important;
        border-left: 4px solid #0ea5e9 !important;
    }

    .swagger-ui .opblock.opblock-get .opblock-summary-method {
        background: linear-gradient(135deg, #0284c7, #0ea5e9) !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        min-width: 80px !important;
        text-align: center !important;
    }

    /* POST - Vert */
    .swagger-ui .opblock.opblock-post {
        background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05)) !important;
        border-left: 4px solid #10b981 !important;
    }

    .swagger-ui .opblock.opblock-post .opblock-summary-method {
        background: linear-gradient(135deg, #059669, #10b981) !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        min-width: 80px !important;
        text-align: center !important;
    }

    /* PUT - Orange */
    .swagger-ui .opblock.opblock-put {
        background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05)) !important;
        border-left: 4px solid #f59e0b !important;
    }

    .swagger-ui .opblock.opblock-put .opblock-summary-method {
        background: linear-gradient(135deg, #d97706, #f59e0b) !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        min-width: 80px !important;
        text-align: center !important;
    }

    /* DELETE - Rouge */
    .swagger-ui .opblock.opblock-delete {
        background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05)) !important;
        border-left: 4px solid #ef4444 !important;
    }

    .swagger-ui .opblock.opblock-delete .opblock-summary-method {
        background: linear-gradient(135deg, #dc2626, #ef4444) !important;
        border-radius: 8px !important;
        font-weight: 700 !important;
        min-width: 80px !important;
        text-align: center !important;
    }

    /* ===== SUMMARY TEXT ===== */
    .swagger-ui .opblock-summary-description,
    .swagger-ui .opblock-summary-path {
        color: #e2e8f0 !important;
        font-weight: 500 !important;
    }

    .swagger-ui .opblock-summary-path {
        color: #93c5fd !important;
        font-family: 'Courier New', monospace !important;
        font-size: 14px !important;
    }

    /* ===== CORPS OUVERT D'UN BLOC ===== */
    .swagger-ui .opblock-body,
    .swagger-ui .opblock-section,
    .swagger-ui .opblock-description-wrapper {
        background: rgba(15, 23, 42, 0.6) !important;
        color: #cbd5e1 !important;
    }

    .swagger-ui .opblock .opblock-section-header {
        background: rgba(255,255,255,0.05) !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    }

    .swagger-ui .opblock .opblock-section-header label,
    .swagger-ui .opblock .opblock-section-header h4 {
        color: #93c5fd !important;
        font-weight: 600 !important;
    }

    /* ===== PARAMÈTRES ===== */
    .swagger-ui table thead tr th,
    .swagger-ui .parameters-col_name,
    .swagger-ui .parameters-col_description {
        color: #7dd3fc !important;
        font-weight: 600 !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    }

    .swagger-ui .parameter__name,
    .swagger-ui .parameter__type,
    .swagger-ui .parameter__in {
        color: #cbd5e1 !important;
    }

    .swagger-ui .parameter__name.required::after {
        color: #f87171 !important;
    }

    /* ===== INPUTS ===== */
    .swagger-ui input[type=text],
    .swagger-ui textarea,
    .swagger-ui select {
        background: #1e293b !important;
        color: #e2e8f0 !important;
        border: 1px solid #3b82f6 !important;
        border-radius: 8px !important;
        padding: 8px 12px !important;
    }

    .swagger-ui input[type=text]:focus,
    .swagger-ui textarea:focus {
        border-color: #60a5fa !important;
        box-shadow: 0 0 0 3px rgba(96,165,250,0.2) !important;
        outline: none !important;
    }

    /* ===== BOUTON EXECUTE ===== */
    .swagger-ui .btn.execute {
        background: linear-gradient(135deg, #1d4ed8, #3b82f6) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 10px 24px !important;
        font-weight: 600 !important;
        letter-spacing: 0.5px !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 4px 12px rgba(37,99,235,0.4) !important;
    }

    .swagger-ui .btn.execute:hover {
        background: linear-gradient(135deg, #1e40af, #2563eb) !important;
        box-shadow: 0 6px 20px rgba(37,99,235,0.6) !important;
        transform: translateY(-1px) !important;
    }

    /* ===== BOUTON TRY IT OUT ===== */
    .swagger-ui .try-out__btn {
        background: transparent !important;
        color: #60a5fa !important;
        border: 1px solid #3b82f6 !important;
        border-radius: 8px !important;
        padding: 6px 16px !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
    }

    .swagger-ui .try-out__btn:hover {
        background: rgba(59,130,246,0.15) !important;
    }

    /* ===== RÉPONSES ===== */
    .swagger-ui .responses-wrapper {
        background: rgba(15,23,42,0.5) !important;
        border-radius: 8px !important;
    }

    .swagger-ui .response-col_status {
        color: #34d399 !important;
        font-weight: 700 !important;
    }

    .swagger-ui .response-col_description {
        color: #cbd5e1 !important;
    }

    .swagger-ui .highlight-code pre,
    .swagger-ui .microlight {
        background: #0f172a !important;
        color: #7dd3fc !important;
        border-radius: 8px !important;
        padding: 12px !important;
    }

    /* ===== CODES DE RÉPONSE ===== */
    .swagger-ui .response .response-col_status .response-undocumented {
        color: #64748b !important;
    }

    /* ===== SCROLLBAR ===== */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #60a5fa; }

    /* ===== MODÈLES / SCHEMAS ===== */
    .swagger-ui section.models {
        background: rgba(255,255,255,0.03) !important;
        border: 1px solid rgba(59,130,246,0.2) !important;
        border-radius: 12px !important;
        padding: 16px !important;
    }

    .swagger-ui section.models h4 {
        color: #93c5fd !important;
        font-weight: 700 !important;
    }

    .swagger-ui .model-title {
        color: #60a5fa !important;
    }

    .swagger-ui .model {
        color: #cbd5e1 !important;
    }
`;

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
        customCss,
        customSiteTitle: '🏠 Agence Immobilière API',
        customfavIcon: 'https://fav.farm/🏠',
        swaggerOptions: {
            docExpansion: 'list',       // Affiche les routes sans les ouvrir
            filter: true,               // Active la barre de recherche
            showExtensions: true,
            tryItOutEnabled: false,     // Try-it-out désactivé par défaut
            persistAuthorization: true,
            displayRequestDuration: true, // Affiche le temps de réponse
            defaultModelsExpandDepth: 1,
        },
    }));
};

module.exports = setupSwagger;
