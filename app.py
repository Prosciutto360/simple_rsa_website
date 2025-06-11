from flask import Flask, request, jsonify, render_template
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import base64

app = Flask(__name__)

# Generate RSA key
key = RSA.generate(2048)
public_key = key.publickey()
cipher_encrypt = PKCS1_OAEP.new(public_key)
cipher_decrypt = PKCS1_OAEP.new(key)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.json.get("plaintext", "")
    ascii_values = [ord(c) for c in data]
    encrypted = cipher_encrypt.encrypt(data.encode())
    encrypted_b64 = base64.b64encode(encrypted).decode()
    return jsonify({
        "ascii": ascii_values,
        "encrypted": encrypted_b64
    })

@app.route("/decrypt", methods=["POST"])
def decrypt():
    encrypted_b64 = request.json.get("encrypted", "")
    encrypted_bytes = base64.b64decode(encrypted_b64)
    decrypted = cipher_decrypt.decrypt(encrypted_bytes).decode()
    ascii_values = [ord(c) for c in decrypted]
    return jsonify({
        "plaintext": decrypted,
        "ascii": ascii_values
    })

if __name__ == "__main__":
    app.run(debug=True)
