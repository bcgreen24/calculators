from flask import Flask, render_template, jsonify
from flask import request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')


@app.route('/multiply', methods=['POST', 'GET'])
def multiply():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    return jsonify(result=a * b)


@app.route('/divide', methods=['POST', 'GET'])
def divide():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    return jsonify(result=a / b)


@app.route('/add', methods=['POST', 'GET'])
def add():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    return jsonify(result=a + b)


@app.route('/subtract', methods=['POST', 'GET'])
def subtract():
    a = request.args.get('a', 0, type=float)
    b = request.args.get('b', 0, type=float)
    return jsonify(result=a - b)


@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    app.run()
