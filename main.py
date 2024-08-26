from http.server import BaseHTTPRequestHandler, HTTPServer
import paoding, subprocess

def ipcReceived(channel, data):
  subprocess.run(["code.cmd", data["filePath"]])

paoding.ipcOn(ipcReceived)

class MyServer(BaseHTTPRequestHandler):
  def do_GET(self):
    self.send_response(200)
    self.send_header("Content-Type", "text/plain")
    self.end_headers()
    self.wfile.write(bytes("Hello Paoding", "utf-8"))
    self.wfile.flush()

webServer = HTTPServer(("localhost", 9103), MyServer)
print("Listening web server on :9103.")
webServer.serve_forever()