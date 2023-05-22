# import crypt

from hashlib import scrypt
from flask import Flask, request, jsonify
import myCar as car
import json
from flask_cors import CORS
from Users import User
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,get_jwt_identity)

from Users import User
import bcrypt
app = Flask(__name__)
CORS(app)

import mysql.connector
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config["JWT_ALGORITHM"] = "HS256"
jwt = JWTManager(app)

mydb = mysql.connector.connect(
    host="127.0.0.1",
    port=3307,
    user="root",
    password="MySql123",
    database="crudcar"
)


# les web methods

@app.route('/savecar', methods=['POST'])
def saveCar():
    args = request.json
    model = args.get('model')
    hp = args.get('hp')
    marque = args.get('marque')

    myCursor = mydb.cursor()

    mycar = car.Car('None', model, hp, marque)
    req = "INSERT INTO car (model, hp, marque) VALUES (%s, %s, %s)"
    val = (mycar.model, mycar.hp, mycar.marque)
    myCursor.execute(req, val)
    mydb.commit()
    id_car = myCursor.lastrowid
    print(myCursor.rowcount, "record ins")

    return jsonify({"message": "Car saved"})


@app.route('/cars', methods=['GET'])
def getCars():
    mylist = []
    req = "SELECT * FROM car"

    myCursor = mydb.cursor()
    myCursor.execute(req)
    myresult = myCursor.fetchall()
    for x in myresult:
        mylist.append(car.Car(x[0], x[1], x[2], x[3]).__dict__)

    return jsonify(mylist)


@app.route('/deletecar/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    myCursor = mydb.cursor()

    req = "DELETE FROM car WHERE id = %s"
    val = (car_id,)
    myCursor.execute(req, val)
    mydb.commit()
    print(myCursor.rowcount, "record(s) deleted")

    return jsonify({"message": "Car deleted"})

@app.route('/editcar/<int:id>', methods=['PUT'])
def editCar(id):
    print("edit backend")
    args = request.json
    model = args.get('model')
    hp = args.get('hp')
    marque = args.get('marque')
 
    myCursor = mydb.cursor()
    mycar = car.Car('None', model, hp, marque)
    print(str(mycar))
    
    req = "UPDATE car SET model = %s, hp = %s, marque = %s WHERE id = %s"
    val = (mycar.model, mycar.hp, mycar.marque,id)
    myCursor.execute(req, val)
    mydb.commit()
    id_car = myCursor.lastrowid
    print(myCursor.rowcount, "record updeted")
    
    return jsonify({"message": "Car updated"})


# @app.route('/editcar/<int:car_id>', methods=['PUT'])
# def edit_car(car_id):

#     args = request.json
#     model = args.get('model')
#     hp = args.get('hp')
#     marque = args.get('marque')
#     print(car_id)
#     print(model)

#     myCursor = mydb.cursor()

#     req = "UPDATE car SET model = %s, hp = %s, marque = %s WHERE id = %s"
#     val = (model, hp, marque, car_id)
#     myCursor.execute(req, val)
#     mydb.commit()
#     print(myCursor.rowcount, "record(s) updated")

#     return "Car updated"


@app.route('/login' , methods = ['POST'])
def login():
    try:
        username = request.json.get("username", None)
        password = request.json.get("password", None)


        cursor = mydb.cursor()
        req = "SELECT * FROM mydb.users WHERE username = %s"
        val = (username,)
        cursor.execute(req, val)
        result = cursor.fetchone()
        if result is None:
            return jsonify({"status": "error", "data": "Bad username or password"}), 401
        user = User(result[1], result[2])
       
        if not (password == user.password):
            return jsonify({"status": "error", "data": "Bad username or password"}), 401

        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "data": "An error has occurred"}), 401
    
@app.route('/registration' , methods = ['POST'])
def register():
    try:
   
        username = request.json.get("username", None)
        password = request.json.get("password", None)
        print(username)
        print(password)
        cursor = mydb.cursor()
        req = "INSERT INTO users (username, password) VALUES (%s, %s)"
        user = User(username, password = password)
        val = (user.username, user.password)
        cursor.execute(req, val)
        print("PASSED THE DB EXECUTION ")
        mydb.commit()
        access_token = create_access_token(identity=username)
        return jsonify({"status": "success", "data": {"jwt": access_token}}), 201
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "data": "An error has occurred"}), 401

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
