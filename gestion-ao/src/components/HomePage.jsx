import React from 'react';
import { Link } from "react-router-dom";
import '../Fichiers_css/homePage.css';

const HomePage = () => {
  return (
    <>
      <header>
       
        
      </header>

      <section className="hero-section">
        <h1>Bienvenue sur la Plateforme d'Appels d'Offres</h1>
        <p>Accédez à tous les appels d'offres, gérez vos candidatures et suivez vos processus en temps réel.</p>
        <Link to="/login" className="cta-button">
          Accéder au Tableau de Bord
        </Link>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <i className="fas blue fa-search"></i>
          <h3>Recherche Simplifiée</h3>
          <p>Trouvez rapidement les appels d'offres pertinents pour votre activité</p>
        </div>

        <div className="feature-card">
          <i className="fas blue fa-industry"></i>
          <h3>Par Secteur</h3>
          <p>Navigation par secteur d'activité pour des résultats ciblés</p>
        </div>

        <div className="feature-card">
          <i className="fas blue fa-tasks"></i>
          <h3>Suivi de Process</h3>
          <p>Gérez efficacement vos candidatures avec notre système de workflow</p>
        </div>

        <div className="feature-card">
          <i className="fas blue fa-chart-bar"></i>
          <h3>Statistiques</h3>
          <p>Analysez vos performances et optimisez vos chances de succès</p>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>À propos</h4>
            <ul>
              <li><a href="/about">Qui sommes-nous</a></li>
              <li><a href="/mission">Notre mission</a></li>
              <li><a href="/values">Nos valeurs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@richart-partners.com">contact@richat-partners.com</a></li>
              <li><a href="tel:+1234567890">Téléphone</a></li>
              <li><a href="/contact">Formulaire de contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Légal</h4>
            <ul>
              <li><a href="/privacy">Politique de confidentialité</a></li>
              <li><a href="/terms">Conditions d'utilisation</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>© 2024 Plateforme d'Appels d'Offres. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;