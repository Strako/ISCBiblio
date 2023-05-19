#import modules an libraries from flask
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import requests
import jwt

#Create a Flask instance
app = Flask(__name__)
#----------------------app config----------------------
app.config['SESSION_COOKIE_NAME'] = "SESSION_DATA"
app.secret_key = 'testSecretKey'

#---------Global variables--------------
api_url = "http://localhost:3000/"

#---------Global functions--------------
def isLogged():
    if session.get('logged_in'):
        return True
    else:
        return False


def decodeToken(token):
    try:
        return jwt.decode(token, "Testing", algorithms=['HS256'])
    except:
        return False

def getToken():
    return session['token']
#------------------Routes------------------

#login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if isLogged():
        return redirect(url_for('index'))
    else:
        #if exists a req with method POST, get the data from the form and send to backend to validate
        if request.method == 'POST':
            usr = request.form['usrname']
            passwd = request.form['passwd']
            #json data to send to the backend
            dataSession ={
                "mail": usr,
                "password": passwd
            }
            #try send the data to the backend using the API_URL
                #make a request to the backend
            res = requests.post(api_url + 'signin', json=dataSession)
            #manage res with the status code
            if res.status_code == 200:
                #get token from response data
                token = res.json()['token']
                #set session data and put the token in cookie session
                session['logged_in'] = True
                session['token'] = token
                session['user'] = usr
                session['role'] = decodeToken(token)['role']
                return redirect(url_for('index'))
            elif res.status_code == 401:
                flash('Usuario o contraseña incorrectos')
                return render_template('login.html')
            elif res.status_code == 500:
                flash('Error al conectar con el servidor')
                return render_template('login.html')
        #if not req, render the login page using render_template
        else:
            return render_template('login.html')

#logout route
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('token', None)
    session.pop('user', None)
    return redirect(url_for('login'))

#index route
@app.route('/')
def index():
    if isLogged():
        current="index"
        return render_template('index.html', user=session['user'], role=session['role'],page = current)
    return redirect(url_for('login'))


@app.route('/Libros')
def books():
    if isLogged():
        return render_template('Libros.html', user=session['user'], role=session['role'])
    return redirect(url_for('login'))

@app.route('/Prestamos')
def prestamos():
    if isLogged():
        return render_template('Prestamos.html', user=session['user'], role=session['role'])
    return redirect(url_for('login'))

@app.route('/Auditorias')
def Auditorias():
    if isLogged():
        return render_template('Auditorias.html', user=session['user'], role=session['role'])
    return redirect(url_for('login'))


@app.route('/Lectores')
def Lectores():
    if isLogged():
        return render_template('Lectores.html', user=session['user'], role=session['role'])
    return redirect(url_for('login'))

@app.route('/Administrador')
def Administrador():
    if isLogged():
        return render_template('Administrador.html', user=session['user'], role=session['role'])
    return redirect(url_for('login'))


"""#?----------------------------------------------routes for get data from API----------------------------------------"""

"""----------------------------------------------rutas para libros-------------------------------------------------"""
@app.route('/getBooks', methods=['GET'])
def getBooks():
    if isLogged():
        token = getToken()
        headers={
            "Authorization": "Bearer " + token
        }
        res = requests.get(url='http://localhost:3000/books/get-books', headers=headers)

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        # Hacer algo con la respuesta JSON
        else:
            print("Error en la solicitud:", res.status_code)
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/searchBook', methods=['POST'])
def searchBook():
    if isLogged():
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        bookID = request.form['search']
        res = requests.post(url='http://localhost:3000/books/get-book', headers=headers, json={"book_id": bookID})

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        # Hacer algo con la respuesta JSON
        else:
            print("Error en la solicitud:", res.status_code)
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/addBook', methods=['POST'])
def addBook():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        #print(data)
        res = requests.post(
            url='http://localhost:3000/books/insert-book', headers=headers, json=data)
        if res.status_code == 200:
            return jsonify('ok')
        else:
            print("Error en la solicitud:", res.status_code)
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/updateBook', methods=['POST'])
def updateBook():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        #print(data)
        res = requests.put(
            url='http://localhost:3000/books/update-book', headers=headers, json=data)
        if res.status_code == 200:
            return jsonify('ok')
        else:
            #print("Error en la solicitud:", res.status_code)
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/deleteBook', methods=['POST'])
def deleteBook():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        print(data)
        res = requests.delete(
            url='http://localhost:3000/books/delete-book', headers=headers, json=data)
        if res.status_code == 200:
            return jsonify('ok')
        else:
            #print("Error en la solicitud:", res.status_code)
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

"""----------------------------------------------rutas para prestamos-------------------------------------------------"""
@app.route('/getBorrows', methods=['GET'])
def getBorrows():
    if isLogged():
        token = getToken()
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }

        res = requests.get(url='http://localhost:3000/borrows/get-borrows', headers=headers)

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/getBorrow', methods=['POST'])
def getBorrow():
    if isLogged():
        data = request.form['search']
        token = getToken()
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        res = requests.post(url='http://localhost:3000/borrows/get-borrow', headers=headers, json={"borrow_id": data})

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/getDataBorrow', methods=['POST'])
def getDataBorrow():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        res = requests.post(url='http://localhost:3000/borrows/get-borrow', headers=headers, json=data)

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

@app.route('/addBorrow', methods=['POST'])
def addBorrow():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        res = requests.post(url='http://localhost:3000/borrows/insert-borrow', headers=headers, json=data)
        if res.status_code == 200:
            return jsonify('ok')
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))


@app.route('/updateBorrow', methods=['POST'])
def updateBorrow():
    if isLogged():
        data = request.get_json()
        token = getToken()
        headers = {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        res = requests.put(url='http://localhost:3000/borrows/update-borrow', headers=headers, json=data)
        if res.status_code == 200:
            return jsonify('ok')
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))

"""----------------------------------------------rutas para logs-------------------------------------------------"""
@app.route('/getLogs', methods=['GET'])
def getLogs():
    if isLogged():
        token = getToken()
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
        res = requests.get(
            url='http://localhost:3000/logs/get-logs', headers=headers)

        if res.status_code == 200:
            data = res.json()
            return jsonify(data)
        else:
            return jsonify('error al conectar con el servidor')
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(port=5500, debug=True)
