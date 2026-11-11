#!/usr/bin/env bash
# ============================================================
#  UNGÉLEC — Installation du site sur une VM (Debian/Ubuntu)
#  VM de la Freebox Delta (ou tout serveur Debian/Ubuntu)
# ============================================================
#  Usage :
#    1) copier le contenu du site dans un dossier (ex. ~/ungelec)
#    2) depuis ce dossier :  bash installer_site_vm.sh
# ============================================================
set -e

APP_DIR="/var/www/ungelec"
DOMAIN="_"          # "_" = répond sur toutes les requêtes

echo "▶ Installation de nginx et unzip..."
sudo apt update -y
sudo apt install -y nginx unzip

echo "▶ Copie du site vers ${APP_DIR} ..."
sudo mkdir -p "$APP_DIR"
sudo cp -r ./* "$APP_DIR"/ 2>/dev/null || true
sudo chown -R www-data:www-data "$APP_DIR"

echo "▶ Configuration nginx..."
sudo tee /etc/nginx/sites-available/ungelec >/dev/null <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name ${DOMAIN};
    root ${APP_DIR};
    index index.html;

    # --- Protection par mot de passe (décommenter pour activer) ---
    # auth_basic "Accès privé";
    # auth_basic_user_file /etc/nginx/.htpasswd;

    location / { try_files \$uri \$uri/ =404; }

    # Page 404 personnalisée
    error_page 404 /404.html;
}
EOF

sudo ln -sf /etc/nginx/sites-available/ungelec /etc/nginx/sites-enabled/ungelec
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

IP="$(hostname -I | awk '{print $1}')"
echo
echo "✅ Site installé."
echo "   → http://${IP}/"
echo
echo "Pour activer un MOT DE PASSE (avis privé famille) :"
echo "   sudo apt install -y apache2-utils"
echo "   sudo htpasswd -c /etc/nginx/.htpasswd famille"
echo "   puis décommenter les 2 lignes auth_basic dans /etc/nginx/sites-available/ungelec"
echo "   sudo systemctl reload nginx"
