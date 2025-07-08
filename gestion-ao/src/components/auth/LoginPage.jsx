import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Définition des styles utilisés dans le composant
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6fb",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  leftSide: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    background: "#003366",
    clipPath: "polygon(0 0, 60% 0, 50% 100%, 0% 100%)",
  },
  text: {
    position: "absolute",
    left: "5vw",
    top: "15vh",
    color: "#CDB06B",
    fontSize: "2rem",
    fontWeight: "bold",
    zIndex: 1,
    maxWidth: "25vw",
    lineHeight: 1.3,
  },
  loginBox: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "40px 32px",
    minWidth: "320px",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#003366",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "16px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #cfd8dc",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "8px",
  },
  button: {
    backgroundColor: "#CDB06B",
    color: "#fff",
    padding: "10px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "8px",
    transition: "background 0.2s",
  },
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fonction déclenchée lors du clic sur le bouton "Envoyer"
  const handleLogin = () => {
    // Redirection directe vers le dashboard
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide} />
      <div style={styles.text}>
        Bienvenue dans votre espace de gestion des procédures des appels d'offres
      </div>
      <div style={styles.loginBox}>
        <div style={styles.loginHeader}>Login</div>
        <div style={styles.form}>
          <label htmlFor="username">Votre login</label>
          <input
            id="username"
            type="text"
            placeholder="Nom d'utilisateur"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Votre mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} onClick={handleLogin}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};