require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const setupSwagger = require('./swaggerConfig'); //importation swaggerConfig


//  CRÉATION DE L'APP 
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

setupSwagger(app);

//  CONNEXION À RAILWAY
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à Railway :", err.message);
        return;
    }
    console.log("Succès ! Connecté à la base MySQL sur Railway.");
});

//  Route
app.get('/api/articles', (req, res) => {
    db.query("SELECT * FROM articles", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/articles', (req, res) => {
    const { titre, contenu, prix, localisation, categorie, tags, auteur } = req.body;
    if (!titre) return res.status(400).json({ error: "Le titre est obligatoire !" });

    const sql = "INSERT INTO articles (titre, contenu, prix, localisation, categorie, tags, auteur) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [titre, contenu, prix, localisation, categorie, JSON.stringify(tags || []), auteur];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, ...req.body });
    });
});

app.get('/api/articles/search', (req, res) => {
    // Correction de la syntaxe pour éviter l'erreur de "token {"
    const search = req.query.query || "";
    const motCle = `%${search}%`;
    const sql = "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?";
    db.query(sql, [motCle, motCle], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// -- TROUVER PAR ID (GET) ---
/**
 * @openapi
 * /api/articles/{id}:
 * get:
 * summary: Récupérer une villa par son ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Détails de la villa
 */
app.get('/api/articles/:id', (req, res) => {
    const sql = "SELECT * FROM articles WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Annonce non trouvée" });
        res.json(result[0]);
    });
});

// --- METTRE À JOUR (PUT) ---
/**
 * @openapi
 * /api/articles/{id}:
 * put:
 * summary: Modifier une annonce existante
 * parameters:
 * - in: path
 * name: id
 * required: true
 * responses:
 * 200:
 * description: Annonce mise à jour
 */
app.put('/api/articles/:id', (req, res) => {
    const { titre, contenu, prix, localisation, categorie, tags } = req.body;
    const sql = "UPDATE articles SET titre=?, contenu=?, prix=?, localisation=?, categorie=?, tags=? WHERE id=?";
    const values = [titre, contenu, prix, localisation, categorie, JSON.stringify(tags || []), req.params.id];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Annonce mise à jour avec succès !" });
    });
});

// ---  SUPPRIMER (DELETE) ---
/**
 * @openapi
 * /api/articles/{id}:
 * delete:
 * summary: Supprimer une villa du Cloud
 * parameters:
 * - in: path
 * name: id
 * required: true
 * responses:
 * 200:
 * description: Article supprimé
 */
app.delete('/api/articles/:id', (req, res) => {
    const sql = "DELETE FROM articles WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Article supprimé du Cloud Railway !" });
    });
});

//  LANCEMENT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur : http://localhost:${PORT}/api-docs`);
});
