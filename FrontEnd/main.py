#import modules an libraries from flask
from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import requests


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
            try:
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
                    return redirect(url_for('index'))
                elif res.status_code == 401:
                    flash('Usuario o contraseña incorrectos')
                    return render_template('login.html')
            except:
                #if the backend is not available, show a message
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
        return render_template('index.html')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(port=5500, debug=True)