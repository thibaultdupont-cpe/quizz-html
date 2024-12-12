import http.server
import socketserver

PORT = 5000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Un gestionnaire de requêtes qui ajoute des en-têtes CORS."""
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        super().end_headers()

# Créer et lancer le serveur
def run_server(port=PORT):
    with socketserver.TCPServer(("", port), CORSRequestHandler) as httpd:
        print(f"Serving on port {port}. Accédez à http://localhost:{port}/")
        print("Appuyez sur Ctrl+C pour arrêter le serveur.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nArrêt du serveur.")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
