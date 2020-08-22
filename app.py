from flask import Flask, render_template, jsonify
from flask import request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')


@app.route('/calculate', methods=['POST', 'GET'])
def calculate():
    key = request.args.get('key', 0, type=str)
    if check_key(key):
        a = request.args.get('a', 0, type=float)
        b = request.args.get('b', 0, type=float)
        oper = request.args.get('oper', 0, type=str)
        if oper == 'add':
            return jsonify(result=a + b)
        elif oper == 'subtract':
            return jsonify(result=a - b)
        elif oper == 'divide':
            return jsonify(result=a / b)
        elif oper == 'multiply':
            return jsonify(result=a * b)
    else:
        return jsonify(result="NOT AUTHORIZED")


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

def check_key(key):
    if key != 'qweasdzxc':
        return False
    else:
        return True

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
