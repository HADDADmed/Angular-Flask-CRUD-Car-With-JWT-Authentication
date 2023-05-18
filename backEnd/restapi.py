from flask import Flask, request, jsonify
import myCar as car
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import mysql.connector

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



if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
