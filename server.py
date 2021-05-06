# Import the folowwing classes
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import parse_qs


class MyrequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/friends":
            data_collector = open("data.txt", "r")
            data_text = (data_collector.readlines())
            data_collector.close()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(data_text), "utf-8"))

        elif self.path == "/404":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps(data_text), "utf-8"))
        else:
            self.send_error(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/friends":
            # 1. unpack the body(data)
            json_post = open("data.txt", "a")
            lenght = self.headers["Content-Length"]
            # read the body
            body = self.rfile.read(int(lenght)).decode("utf-8")
            # parse the body
            parsed_body = parse_qs(body)
            name = parsed_body["name"][0]
            json_post.write(name + "\n")
            json_post.close()
            # Print
            # 2. respond to the client
            self.send_response(201)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

        else:
            self.send_error(404)
            self.end_headers()
        pass


def run():
    # Server Adress
    listen = ("localhost", 8080)
    # Listen to your request and wait for the next request
    server = HTTPServer(listen, MyrequestHandler)
    print("Server Online")
    server.serve_forever()


run()
